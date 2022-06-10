
import { useCallback, useEffect, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import checkoutService from '../../services/checkout';
import servicesExternal from '../../services/externalRequest';
import { isValidCreditCardNumber, isValidExpirationDate } from '../../utils/fieldValidation';
import {  isValidCnpj, isValidCpf, isValidEmail, onlyUnsignedNumbers, stringNormalize } from '../../utils/strings';
import PageBanner from '../Common/PageBanner';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image'
import shoppingCartService from '../../services/cart';
import ErrorImage from '../../public/images/erro.svg';
import SuccessImage from '../../public/images/success.svg';
import WaitingImage from '../../public/images/waiting.svg';
import { scrollToElement } from '../../utils/scrollTo';
import { copyToClipboard } from '../../utils/functions';
import { useCart } from '../../context/cart';
import { TicketDataForm } from '../TicketDataForm';
import { MobileTicketsTable } from '../TicketsTable/Mobile';
import { TicketsTable } from '../TicketsTable/Desktop';
import { CreditCardFields } from '../CreditCardFields';
import styles from './styles.module.scss';

const Checkout = ({ dados, cartItems, handleChangeTicketQuantity, handleDeleteItem, isLoadingCartItem, setHideOnCheckout, hideOnCheckout, seller }) => {

    const isMobile = useMediaQuery({ maxWidth: 768 })
    const {cartId} = useCart(); 
    const [deletedTicketId, setDeletedTicketId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [ticketsData, setTicketsData] = useState([]);
    const [ticketIdUsingMyAccountData, setTicketIdUsingMyAccountData] = useState(null);
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
    const [textLoading, setTextLoading] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [showInputErros, setShowInputErros] = useState(false);
    const [showCheckoutInputErros, setShowCheckoutInputErros] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [pixValue, setPixValue] = useState(false);
    const [installmentOptions, setInstallmentOptions] = useState([]);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [cupom, setCoupon] = useState('');
    const [couponId, setCouponId] = useState('');
    const [couponInfo, setCouponInfo] = useState(false);
    const [showConfirmationPayment, setShowConfirmationPayment] = useState(false);
    const [showErrorOnPayment, setShowErrorOnPayment] = useState(false);

    const [totalTickets, setTotalTickets] = useState(0);
    const [showCreditCardFields, setShowCreditCardFields] = useState(false);
    const [creditCardData, setCreditCardData] = useState({
        number: '',
        expirationDate: '',
        cvv: '',
        name: '',
        holderDocument: ''
    });

    const [billingData, setBillingData] = useState({
        cep: '',
        address: '',
        city: '',
        state: ''
    });

    const [paymentFeedback, setPaymentFeedback] = useState({
        title: '',
        message: '',
        image: null,
        qrCodeLink: ''
    })

    const [installmentsNumber, setInstallmentsNumber] = useState(1);

    const handleShowConfirmDeleteItem = (id) => {
        setShowConfirmModal(true);
        setDeletedTicketId(id)
    }

    const handleConfirmDeleteItem = (id) => {
        setShowConfirmModal(false);
        handleDeleteItem(id);
        setDeletedTicketId(null)
    }

    const handleCancelDeleteTicket = () => {
        setShowConfirmModal(false);
        setDeletedTicketId(null);
    }

    const ConfirmDeleteModal = () => (
        <Modal show={showConfirmModal}>

            <Modal.Body>
                <h5>Remover ingresso da lista?</h5>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" class="btn btn-danger min-height-45" onClick={() => handleConfirmDeleteItem(deletedTicketId)}>Confirmar</button>
                <button type="button" class="btn btn-primary min-height-45" data-dismiss="modal" onClick={() => handleCancelDeleteTicket()}>Cancelar</button>
            </Modal.Footer>
        </Modal>
    )

    const LoadingCheckout = () => (
        <div className='container-spinner-fixed'>
            <div class="spinner-border fixed" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <h2 className='pt-2'>{textLoading}</h2>
        </div>
    )

    const generateInputTicketsData = useCallback(async () => {

        let ticketsDataTemp = {};
        let totalTicketsTemp = 0;
        await Promise.all(cartItems.map(item => {
            totalTicketsTemp += item.quantidade;
            let ticketsDataItem = ticketsData[item.idIngresso] ? ticketsData[item.idIngresso] : [];
            if (item.quantidade === 0) {
                ticketsDataItem = [];
            } else if (item.quantidade < ticketsDataItem?.length) {
                ticketsDataItem = ticketsDataItem.filter((a, i) => item.quantidade > i)
            } else if (item.quantidade > ticketsDataItem?.length) {

                let initialQuantity = item.quantidade - ticketsDataItem?.length;
                for (let i = 0; i < initialQuantity; i++) {

                    ticketsDataItem.push({
                        description: `${i + 1}º - ${item.nome}`,
                        idIngresso: item.idIngresso,
                        name: '',
                        cpf: '',
                        phone: '',
                        email: ''
                    })
                }
            }
            ticketsDataTemp[item.idIngresso] = ticketsDataItem;
        }));

        Object.values(ticketsDataTemp).map(a => {
            a.map(b => {
            })
        })

        setTotalTickets(totalTicketsTemp);
        setTicketsData(ticketsDataTemp);

    }, [cartItems, ticketsData]);

    const getAvailablePaymentInfo = useCallback(async () => {
        setIsLoadingCheckout(true);
        const response = await checkoutService.getPaymentInfo({ eventId: dados?.id ? dados?.id : '', couponId: couponId ? couponId : false, cartId });
        if (response?.data?.success && response?.data?.data) {
            const data = response.data.data;
            console.log("=======");
            console.log(data);
            setInstallmentOptions(data?.credit ? data.credit : []);
            setPixValue(data?.pix ? data.pix : '');
            setCouponInfo(data?.couponInfo)
        }
        setIsLoadingCheckout(false);
    }, [couponId, dados])

    const getAvailablePaymentOptions = useCallback(async () => {
        setIsLoadingCheckout(true);
        const response = await checkoutService.getPaymentOptions({ params: { eventId: dados?.id ? dados?.id : '' } });
        if (response?.data?.success && response?.data?.data) {
            const data = response.data.data;
            console.log("=======");
            console.log(data);
            setPaymentOptions(data ? data : []);
        }
        setIsLoadingCheckout(false);
    }, [couponId, dados])

    const handleUseMyAccountData = async ({ checked, ticketsDataIndex, ticketIndex, idIngresso }) => {
        if (checked) {
            setTextLoading("Buscando dados da conta");
            setIsLoadingCheckout(true);
            const result = await checkoutService.getCustomerForCheckout()
            if (result.status === 200) {
                const data = result.data.data;

                let newTicketsData = {}
                Object.values(ticketsData).map((ticketType, index) => {
                    const idIngresso = ticketType[0].idIngresso;

                    const newTicketData = ticketType.map((ticket, i) => {
                        if (index === ticketsDataIndex && i === ticketIndex) {
                            return {
                                ...ticket,
                                cpf: data.cpf,
                                name: data.name,
                                email: data.email,
                                phone: data.fone
                            }
                        } else {
                            return ticket;
                        }
                    });
                    newTicketsData[idIngresso] = newTicketData;
                });
                setTicketsData(newTicketsData);
                setTicketIdUsingMyAccountData(idIngresso);

            } else {
                toast.error(result?.response?.data?.msg ? result.response.data.msg : "Erro ao buscar os dados", {
                    autoClose: 2000
                })
            }
            setIsLoadingCheckout(false);
            setTextLoading("");
        } else {

        }
    }

    const handleChangeTicketData = ({ value, field, ticketsDataIndex, ticketIndex }) => {
        console.log(value);
        let newTicketsData = {}
        Object.values(ticketsData).map((ticketType, index) => {
            const idIngresso = ticketType[0].idIngresso;

            const newTicketData = ticketType.map((ticket, i) => {
                if (index === ticketsDataIndex && i === ticketIndex) {
                    return {
                        ...ticket,
                        [field]: value
                    }
                } else {
                    return ticket;
                }
            });
            newTicketsData[idIngresso] = newTicketData;
        });
        setTicketsData(newTicketsData)
    }

    const handleShowPayment = () => {
        let showErrorTemp = false;
        Object.values(ticketsData).map((ticketType, index) => {
            ticketType.map((ticket, i) => {
                if (
                    ticket.name.length < 2
                    || (ticket.cpf?.length > 0 && !isValidCpf(ticket.cpf))
                    || ticket.phone.length < 10
                    || (!isValidEmail(ticket.email) && ticket.email?.length > 0)
                ) {
                    showErrorTemp = true;
                }
            })
        })
        if (showErrorTemp) {
            setShowInputErros(true);
            return toast.error("Preencha todos os campos para cada ingresso");
        }
        setShowInputErros(false);
        setShowPayment(true);
        setTimeout(() => {
            scrollToElement({ id: 'apply-extra-padding' })
        }, 500);
    }

    const handleFinishFreeEventSale = () => {
        // setShowPayment(true);
        let showErrorTemp = false;
        Object.values(ticketsData).map((ticketType, index) => {
            ticketType.map((ticket, i) => {
                if (
                    ticket.name.length < 2
                    || (ticket.cpf?.length > 0 && !isValidCpf(ticket.cpf))
                    || ticket.phone.length < 10
                    || (!isValidEmail(ticket.email) && ticket.email?.length > 0)
                ) {
                    showErrorTemp = true;
                }
            })
        })
        if (showErrorTemp) {
            setShowInputErros(true);
            return toast.error("Preencha todos os campos para cada ingresso");
        }
        setShowInputErros(false);
        return handleSubmitSale();
    }

    const handleBackToTicketsData = () => {
        setShowPayment(false);
    }

    const handlePaymentMethod = (value) => {
        setPaymentMethod(value);
        if (value === 'cc') {
            setShowCreditCardFields(true);
        } else {
            setInstallmentsNumber(value);
            setShowCreditCardFields(1);
        }
    }

    const handleChangeInstallmentNumber = (value) => {
        setInstallmentsNumber(value);
    }

    const handleChangeCreditCardData = ({ value, field }) => {
        if (field === 'cvv' && value.length > 3) {
            return;
        } else if (field === 'expirationDate' && value.length > 4) {
            return;
        } else if (field === 'holderDocument' && value.length > 14) {
            return;
        }
        setCreditCardData(prev => ({
            ...prev,
            [field]: value
        }), [])
    }

    const handleChangeBillingData = ({ value, field }) => {
        setBillingData(prev => ({
            ...prev,
            [field]: value
        }), [])
    }

    async function handlerCep(e) {
        let value = onlyUnsignedNumbers(e.target.value);
        handleChangeBillingData({ value, field: 'cep' });
        if (value.length < 8) {
            return;
        }
        setTextLoading("Buscando informações do CEP");
        setIsLoadingCheckout(true);

        const result = await servicesExternal.getCep(value);
        setTextLoading("");
        setIsLoadingCheckout(false);

        if (result.status == 200 && !result?.data?.erro) {
            setBillingData({
                ...billingData,
                cep: value,
                state: result?.data?.uf,
                city: result?.data?.localidade,
                address: `${result?.data?.logradouro}, ${result?.data?.bairro}`
            })

        } else {
            toast.error("Cep invalido", {
                autoClose: 2000
            })
        }

    }

    const generatePayment = () => {
        let payment = []
        if (paymentMethod === 'cc') {

            let cardNumer = creditCardData.number.replaceAll('/\s+/g ', '');

            let expirationDate = creditCardData.expirationDate;
            let expirationYear = `${expirationDate[2]}${expirationDate[3]}`;
            let expirationMonth = `${expirationDate[0]}${expirationDate[1]}`;
            if (expirationMonth < 10) {
                expirationMonth = expirationMonth.replaceAll('0', '');
            }

            payment =
                [
                    {
                        "payment_method": "credit_card",
                        "credit_card": {
                            "recurrence": false,
                            "installments": installmentsNumber,
                            "statement_descriptor": "EVENTOZZ",
                            "card": {
                                "number": cardNumer,
                                "holder_name": creditCardData.name,
                                "exp_month": expirationMonth,
                                "exp_year": expirationYear,
                                "cvv": creditCardData.cvv,
                                "holder_document": creditCardData.holderDocument,
                                "billing_address": {
                                    "line_1": billingData?.address,
                                    "zip_code": billingData?.cep,
                                    "city": billingData?.city,
                                    "state": billingData?.state,
                                    "country": "BR"
                                }
                            }
                        }
                    }
                ]
                ;
        }

        else if (paymentMethod === 'pix') {
            let expirationPix = findExpirationTime(dados?.startDate);
            payment =
                [
                    {
                        "payment_method": "pix",
                        "pix": {
                            "expires_in": expirationPix,
                            "additional_information": [
                                {
                                    "name": "Ingresso comprado no",
                                    "value": " Eventozz"
                                }
                            ]
                        }
                    }
                ];
        }


        return payment;
    }

    function findExpirationTime(eventDate) {
        let days = [0, 1, 3];
        let expirationTime = [3600, 43200, 259200];
        let time = 259200;

        days.forEach(function (item, index) {

            let eventDateTemp = new Date(eventDate);
            let today = new Date();
            let period = eventDateTemp.setDate(eventDateTemp.getDate() - item);
            period = new Date(period);

            console.log('today -> ', today)
            console.log('periodo -> ', period)
            if (period.getTime() > today.getTime()) {
                time = expirationTime[index];
            }
        });

        return time;

    }

    const handleSubmitSale = async () => {
        const errors = [];

        let eventId = dados?.id;


        if (!eventId) {
            return toast.error("Não conseguimos identificar o evento!");
        }
        setIsLoadingCheckout(true);
        setTextLoading("Finalizando compra");

        if (paymentMethod === 'cc') {

            if (!isValidCreditCardNumber(creditCardData.number)) {
                errors.push("Informe um número de cartão de crédito válido");
            }

            if (!isValidExpirationDate(creditCardData.expirationDate)) {
                errors.push("Informe uma Data de Vencimento válida");
            }

            if (creditCardData.cvv.length <= 1) {
                errors.push("Informe o Código de Segurança");
            }

            if (creditCardData.name?.split(' ').length < 2) {
                errors.push("Informe o nome que está escrito no cartão");
            }
            console.log(creditCardData.holderDocument);
            if (!isValidCpf(creditCardData.holderDocument) && !isValidCnpj(creditCardData.holderDocument)) {
                errors.push("Informe o documento do portador do cartão");
            }

            if (billingData.cep.length !== 8) {
                errors.push("Informe um Cep válido");
            }

            if (billingData.address.length === 0) {
                errors.push("Informe o endereço da fatura");
            }

            if (billingData.city.length === 0) {
                errors.push("Informe a cidade do endereço da fatura");
            }

            if (billingData.state.length === 0) {
                errors.push("Informe o estado do endereço da fatura");
            }


            if (errors.length > 0) {
                setTextLoading("");
                setIsLoadingCheckout(false);
                toast.dismiss();
                return toast.error(<ValidationErrorMenssage errorMessage={errors} />, {
                    autoClose: errors.length * 2000,
                });
            }
        }

        const ticketsDataTemp = [];
        Object.values(ticketsData).map((ticketType, index) => {
            if (ticketType?.length > 0) {
                ticketType.map(ticket => {

                    // let cpfTemp = ticket.cpf;
                    // cpfTemp = cpfTemp.replace(".", ""); cpfTemp = cpfTemp.replace(".", ""); cpfTemp = cpfTemp.replace("-", "");
                    // let phoneTemp = ticket.phone;

                    // phoneTemp = phoneTemp.replace("(", ""); phoneTemp = phoneTemp.replace(")", "");
                    // phoneTemp = phoneTemp.replace(" ", ""); phoneTemp = phoneTemp.replace("-", "");
                    console.log(ticket);
                    let vector = {
                        "description": ticket?.description,
                        "idIngresso": ticket?.idIngresso,
                        "name": ticket?.name,
                        "cpf": ticket?.cpf,
                        "phone": ticket?.phone,
                        "email": ticket?.email
                    }
                    ticketsDataTemp.push(vector);
                })
            }
        })
        const ticketsQtd = cartItems.map(item => ({
            qtd: item.quantidade,
            ticketId: item.idIngresso
        }))


        let payments = await generatePayment();
        console.log(ticketsDataTemp);
        const body = {
            couponId, eventId, installmentsNumber, paymentMethod, ticketsData: ticketsDataTemp,
            ticketsQtd, isFree: dados?.is_free, payments, seller, cartId
        }

        const response = await checkoutService.purchaseSave({ body });

        setTextLoading("");
        setIsLoadingCheckout(false);
        if (response?.data?.status === 200) {
            const data = response?.data?.data;
            handlePaymentFeedBack(data);
        } else {
            handlePaymentFeedBack(null, true, response?.data?.msg);
        }
    }

    const ValidationErrorMenssage = ({ closeToast, toastProps, errorMessage }) => (
        <div>
            {
                errorMessage.map(error => (
                    <div>{error}</div>
                ))
            }
        </div>
    )

    const handleSetCoupon = async () => {
        if (!cupom || cupom?.trim() === '') {
            return toast.error("Adicione um cupom válido");
        }
        const accessToken = localStorage.getItem('accessToken');
        setIsLoadingCheckout(true);
        setTextLoading("Adicionando cupom");
        const response = await shoppingCartService.getCouponId({ couponCode: cupom, eventId: dados?.id, accessToken });
        setIsLoadingCheckout(false);
        setTextLoading("");
        if (response?.status === 200) {
            const data = response?.data?.data;
            if (data?.length > 0) {
                console.log(data);
                setCouponId(data[0].couponId);
                toast.success("Cupom aplicado");
            } else {
                setCouponId(null);
            }
        } else {
            setCouponId(null);
            toast.error(response?.response?.data?.msg ? response.response.data.msg : "Não foi possível adicionar o cupom", {
                autoClose: 2000
            })
        }
    }

    function handlePaymentFeedBack(feedback, errorPix = false, msgErrorPix = '') {
        let success = false;
        let title = '';
        let text = '';
        let image = '';
        let link = '';


        if (errorPix) {
            title = 'Falha na transação';
            text = msgErrorPix;
            image = ErrorImage;
            link = false;
        } else {
            if (dados?.is_free) {
                title = 'Reserva realizada!';
                text = 'Seus ingressos já foram reservados e você receberá o QR Code em seu email! <br/> Aproveite muito seu evento!';
                image = SuccessImage;
                success = true;
            } else {
                let status = feedback?.status;
                if (paymentMethod === 'cc') {
                    switch (status) {

                        case "not_authorized":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "captured":
                            title = 'Compra autorizada!';
                            text = `Ficamos extremamente felizes em dizer que sua compra <strong> está autorizada!✅ </strong><br>
                                Em alguns minutos você receberá no seu Whatsapp e no email o seu <strong>QR Code de entrada no evento.</strong><br><br>
                                Você só precisará levar esse comprovante no dia do evento. Tudo bem? <br><br>
                                Lembre-se: <strong>cada QR é ÚNICO.</strong> Então só poderá acessar o evento UMA pessoa por QR Code. Não saia enviando para outras pessoas para evitar qualquer problema.<br><br>
                                `;
                            image = SuccessImage;
                            success = true;
                            break;

                        case "partial_capture":
                            title = 'Pagamento sendo processado!';
                            text = 'Seu pagamento está <strong>sendo processado pela operadora do cartão</strong>. Assim que tivermos uma resposta, já lhe enviamos no email. É só aguardar!';
                            image = WaitingImage;
                            success = true;
                            break;

                        case "authorized_pending_capture":
                            title = 'Pagamento sendo processado!';
                            text = 'Seu pagamento está <strong>sendo processado pela operadora do cartão</strong>. Assim que tivermos uma resposta, já lhe enviamos no email. É só aguardar!';
                            image = WaitingImage;
                            success = true;
                            break;

                        case "waiting_capture":
                            title = 'Pagamento sendo processado!';
                            text = 'Seu pagamento está <strong>sendo processado pela operadora do cartão</strong>. Assim que tivermos uma resposta, já lhe enviamos no email. É só aguardar!';
                            image = WaitingImage;
                            success = true;
                            break;

                        case "refunded":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "voided":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "partial_refunded":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "partial_void":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "error_on_voiding":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "error_on_refunding":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "waiting_cancellation":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "with_error":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;

                        case "failed":
                            title = 'Compra não autorizada!';
                            text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                            image = ErrorImage;
                            break;
                    }
                } else {
                    if (feedback?.qrCode && feedback?.qrCodeUrl) {
                        let qrCodeLink = feedback?.qrCode;
                        let qRCodeImage = feedback?.qrCodeUrl;
                        success = true;
                        title = "Seu PIX foi gerado!";
                        text = `
                            Agora você já pode efetuar o pagamento para gerarmos o seu código de entrada!</br>
                            Siga o seguinte passo-a-passo:
                            <ul style="
                                margin-top: 10px;
                            ">
                                <li><strong>1º passo</strong> - Primeiro selecione e copie o código da conta que deseja pagar no botão COPIAR logo abaixo;</li>
                                <li><strong>2º passo</strong> - Depois abra o app do seu banco favorito e vá para a área de Pix;</li>
                                <li><strong>3º passo</strong> - Clique em Pix Copia e Cola;</li>
                                <li><strong>4º passo</strong> - Onde está escrito Código Pix, cole o código que foi copiado no primeiro passo;</li>
                                <li><strong>5º passo</strong> - Confirme os dados da transação;</li>
                                <li><strong>6º passo</strong> - Aguarde a confirmação em seu Whatsapp e em seu email;</li>
                            </ul>
                            </br>
                    
                            <span style="margin-top: 5px;">O QR Code para entrada no evento chegará em seu Whatsapp quando o pagamento for confirmado!</span>
                            <br>
                            <span style="margin-top: 5px;">Além disso, seu nome e CPF estarão na lista e você pode acessar aqui para emitir uma segunda via!</span>
                            <br>
                            <span style="margin-top: 5px;">Desde já, bom evento em nome da Eventozz!</span>
                        `;
                        image = qRCodeImage ? qRCodeImage : '';
                        link = qrCodeLink ? qrCodeLink : false;
                    } else {
                        title = 'Compra não autorizada!';
                        text = 'Por favor, revise seus dados e tente fazer a compra novamente!<br/><br/><strong>Caso o erro persista</strong> entre em contato com a gente';
                        image = ErrorImage;
                    }

                }
            }
        }


        setPaymentFeedback({
            title,
            message: text,
            image,
            qrCodeLink: link
        });



        if (success) {
            setShowErrorOnPayment(false);
            setShowConfirmationPayment(true);
            setHideOnCheckout(true);
        } else {
            setShowErrorOnPayment(true);
        }

    }

    const handleTryAgain = () => {
        setShowErrorOnPayment(false);
        scrollToElement({ id: 'container-checkout' })
    }


    useEffect(() => {
        generateInputTicketsData();
        setShowPayment(false);
        getAvailablePaymentInfo();
        getAvailablePaymentOptions();
    }, [cartItems]);

    useEffect(() => {
        getAvailablePaymentInfo();
    }, [couponId]);

    useEffect(() => {
        setTimeout(() => {
            if (showErrorOnPayment) {
                scrollToElement({ id: 'container-feedback-error' });
            } else if (showConfirmationPayment) {
                scrollToElement({ id: 'container-feedback-success' });
            }
        }, 1000);
    }, [showErrorOnPayment, showConfirmationPayment])

    return (
        <div className='container' id='container-checkout'>
            <PageBanner
                pageTitle='Finalizar Compra'
                pageSubTitle='Aqui estão todos os ingressos que você escolheu, vamos finalizar?'
            />
            <div className='container pb-70'>
                <Row>
                    <div className='cryptocurrency-table table-responsive'>
                        {
                            isLoadingCartItem && (
                                <div className='container-spinner'>
                                    <div class="spinner-border absolute" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )
                        }
                        {
                            isMobile ? (
                                <MobileTicketsTable cartItems={cartItems} dados={dados} handleChangeTicketQuantity={handleChangeTicketQuantity} 
                                    handleShowConfirmDeleteItem={handleShowConfirmDeleteItem} hideOnCheckout={hideOnCheckout} showPayment={showPayment} 
                                    totalTickets={totalTickets}  />
                            ) : (
                                <TicketsTable cartItems={cartItems} couponInfo={couponInfo} dados={dados} handleChangeTicketQuantity={handleChangeTicketQuantity}
                                    handleShowConfirmDeleteItem={handleShowConfirmDeleteItem} hideOnCheckout={hideOnCheckout} installmentOptions={installmentOptions}
                                    paymentMethod={paymentMethod} pixValue={pixValue} showPayment={showPayment} totalTickets={totalTickets} />
                            )
                        }

                    </div>
                </Row>
                {
                    showPayment && !hideOnCheckout &&
                    <Row>
                        <Col xs={12} sm={6}>
                            <a class="default-btn default-btn-danger default-outline-btn checkout-button  min-height-45" type="button" onClick={() => handleBackToTicketsData()}>Deseja alterar a quantidade de ingressos?</a>
                        </Col>
                    </Row>
                }
                <div id="apply-extra-padding" className={`${showPayment && !hideOnCheckout ? 'apply-extra-padding' : ''}`}>
                    <hr id="hr-divisor" className="hr-divisor" />
                </div>
                {
                    !showPayment && !hideOnCheckout && (
                        <>
                            <div className='section-title'>
                                <h2>Preencha as informações dos ingressos</h2>
                            </div>
                            {
                                Object.values(ticketsData).length > 0 ? (
                                    Object.values(ticketsData).map((ticketType, index) => (
                                        ticketType.map((ticket, i) => (
                                            <TicketDataForm key={ticket.id} ticket={ticket} i={i} index={index} ticketIdUsingMyAccountData={ticketIdUsingMyAccountData} 
                                               handleUseMyAccountData={handleUseMyAccountData} showInputErros={showInputErros} handleChangeTicketData={handleChangeTicketData} />
                                        ))
                                    ))
                                ) : (
                                    <Col xs={12}>
                                        <h4>Nenhum ingresso adicionado</h4>
                                    </Col>
                                )
                            }
                        </>
                    )
                }
                {
                    showPayment && !hideOnCheckout && (
                        <>
                            <Row id="container-payment-checkout" className='container-checkout pb-5'>
                                <Col xs={12} sm={6} className={`pt-3 ${styles.inputContainer}`}>
                                    <h3>Escolha a forma de pagamento</h3>
                                    <Form.Select value={paymentMethod} onChange={(e) => handlePaymentMethod(e.target.value)}>
                                        <option>Selecione uma opção</option>
                                        {
                                            paymentOptions.map((item, i) => (
                                                <option selected={item.value === 'pix' ? true : false} value={item.value}>{item.label}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Col>

                                <Col xs={12} sm={6} className={`pt-3 ${styles.inputContainer}`}>
                                    <h3>Cupom de desconto</h3>
                                    <Row>
                                        <Col xs={6} sm={8}>
                                            <Form.Control placeholder='Insira o código aqui' value={cupom} onChange={(e) => setCoupon(stringNormalize(e.target.value))} />
                                        </Col>
                                        <Col xs={6} sm={4}>
                                            <a class="default-btn default-outline-btn checkout-button cupom-button  min-height-45" type="button" onClick={() => handleSetCoupon()}>Aplicar</a>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {
                                showCreditCardFields && (
                                    <CreditCardFields showCheckoutInputErros={showCheckoutInputErros} creditCardData={creditCardData} 
                                    handleChangeCreditCardData={handleChangeCreditCardData} billingData={billingData} handlerCep={handlerCep}
                                    handleChangeBillingData={handleChangeBillingData} installmentsNumber={installmentsNumber} 
                                    handleChangeInstallmentNumber={handleChangeInstallmentNumber} installmentOptions={installmentOptions} />
                                )
                            }
                        </>
                    )
                }
                {
                    showPayment && !hideOnCheckout && (
                        <Row>
                            <Col xs={12}>
                                <a class="default-btn checkout-button min-height-45" type="button" onClick={() => handleSubmitSale()}>Finalizar</a>
                            </Col>
                        </Row>
                    )
                }
                {
                    Object.values(ticketsData).length > 0 && !showPayment && !hideOnCheckout && (
                        <Row>
                            <Col xs={12}>
                                <a class="default-btn checkout-button  min-height-45" type="button" onClick={() => {
                                    if (dados?.is_free) handleFinishFreeEventSale()
                                    else handleShowPayment()
                                }}>{dados?.is_free ? 'Reservar ingressos' : 'Ir para pagamento'}</a>
                            </Col>
                        </Row>
                    )
                }
                {
                    showConfirmationPayment && (
                        <Row id="container-feedback-success">
                            <Col className='container-msg-feedback m-auto' xs={12} md={6}>

                                <div className='container-title-feedback' xs={12}>
                                    <h2>{paymentFeedback?.title ? paymentFeedback.title : 'Compra não autorizada!'}</h2>
                                </div>
                                <Row dangerouslySetInnerHTML={{ __html: paymentFeedback?.message ? paymentFeedback.message : '' }}></Row>
                                {
                                    !dados?.is_free && paymentMethod === 'pix' && paymentFeedback?.qrCodeLink &&
                                    (
                                        <Row className='copy-button'>
                                            <Col className='container-copy-button' xs={12}>
                                                <a class="default-btn checkout-button  min-height-45" type="button" onClick={() => copyToClipboard(paymentFeedback?.qrCodeLink)}><i className='bx bxs-copy'></i>Copiar</a>
                                            </Col>
                                        </Row>
                                    )
                                }
                            </Col>
                            <Col className='container-img-feedback success-feedback position-relative' xs={12} md={6}>
                                <Image src={paymentFeedback?.image} layout='fill' alt="Imagem sucesso" />
                            </Col>
                            <Col className='m-auto' xs={12}>
                                
                            </Col>
                        </Row>
                    )
                }
                {
                    showErrorOnPayment && (
                        <Row id="container-feedback-error">
                            <Col className='container-msg-feedback m-auto' xs={12} md={6}>
                                <div className='container-title-feedback' xs={12}>
                                    <h2>{paymentFeedback?.title ? paymentFeedback.title : 'Compra não autorizada!'}</h2>
                                </div>
                                <Row dangerouslySetInnerHTML={{ __html: paymentFeedback?.message ? paymentFeedback.message : '' }}></Row>

                                <Col xs={12} sm={6}>
                                    <a class="default-btn default-outline-btn checkout-button  min-height-45" type="button" onClick={() => handleTryAgain()}>Tentar novamente</a>
                                </Col>
                            </Col>
                            <Col className='container-img-feedback position-relative' xs={12} md={6}>
                                <Image src={ErrorImage} layout='fill' alt="Imagem erro" />
                            </Col>
                        </Row>
                    )
                }

            </div>
            {showConfirmModal && <ConfirmDeleteModal />}
            {isLoadingCheckout && <LoadingCheckout />}
        </div>
    );
};

export default Checkout;
