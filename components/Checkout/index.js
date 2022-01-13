
import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import checkoutService from '../../services/checkout';
import { convertMoney, cpfMask, isValidCpf, isValidEmail, phoneMaskForList } from '../../utils/strings';
import PageBanner from '../Common/PageBanner';

const Checkout = ({ dados, cartItems, handleChangeTicketQuantity, handleDeleteItem, isLoadingCartItem }) => {

    const [deletedTicketId, setDeletedTicketId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [ticketsData, setTicketsData] = useState([]);
    const [ticketIdUsingMyAccountData, setTicketIdUsingMyAccountData] = useState(null);
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
    const [textLoading, setTextLoading] = useState('Buscando dados da conta');
    const [showPayment, setShowPayment] = useState(false);
    const [showInputErros, setShowInputErros] = useState(false);
    const [showCheckoutInputErros, setShowCheckoutInputErros] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [showCreditCardFields, setShowCreditCardFields] = useState(false);
    const [creditCardData, setCreditCardData] = useState({
        number: '',
        expirationDate: '',
        cvv: '',
        name: ''
    });

    const [billingData, setBillingData] = useState({
        cep: '',
        address: '',
        city: '',
        state: ''
    });

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

    useEffect(() => {
        console.log('there');
        generateInputTicketsData();
        // setShowPayment(false);
    }, [cartItems]);

    const ConfirmDeleteModal = () => (
        <Modal show={showConfirmModal}>

            <Modal.Body>
                <h5>Remover ingresso da lista?</h5>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" class="btn btn-danger" onClick={() => handleConfirmDeleteItem(deletedTicketId)}>Confirmar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => handleCancelDeleteTicket()}>Cancelar</button>
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
        console.log('here');
        console.log(ticketsData);
        let ticketsDataTemp = {};
        await Promise.all(cartItems.map(item => {
            console.log(item);
            let ticketsDataItem = ticketsData[item.idIngresso] ? ticketsData[item.idIngresso] : [];
            if (item.quantidade === 0) {
                ticketsDataItem = [];
            } else if (item.quantidade < ticketsDataItem?.length) {
                ticketsDataItem = ticketsDataItem.filter((a, i) => item.quantidade > i)
            } else if (item.quantidade > ticketsDataItem?.length) {
                console.log(item.quantidade);
                console.log(ticketsDataItem?.length);
                let initialQuantity = item.quantidade - ticketsDataItem?.length;
                for (let i = 0; i < initialQuantity; i++) {
                    console.log(i);
                    console.log();
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
        console.log(ticketsDataTemp);
        console.log(Object.values(ticketsDataTemp));
        Object.values(ticketsDataTemp).map(a => {
            console.log(a);
            a.map(b => {
                console.log(b);
            })
        })
        // Object.keys(ticketsDataTemp).map( a => {
        //     console.log(ticketsDataTemp[a]);
        // });
        setTicketsData(ticketsDataTemp);

    }, [cartItems, ticketsData])

    const handleUseMyAccountData = async ({ checked, ticketsDataIndex, ticketIndex, idIngresso }) => {
        console.log(checked, ticketsDataIndex, ticketIndex);
        if (checked) {
            let accessToken = window.localStorage.getItem("accessToken");
            setTextLoading("Buscando dados da conta");
            setIsLoadingCheckout(true);
            const result = await checkoutService.getCustomerForCheckout(accessToken)
            console.log(result);
            if (result.status === 200) {
                const data = result.data.data;
                console.log(data);

                let newTicketsData = {}
                Object.values(ticketsData).map((ticketType, index) => {
                    console.log(ticketType);
                    const idIngresso = ticketType[0].idIngresso;

                    const newTicketData = ticketType.map((ticket, i) => {
                        console.log(ticket);
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
                console.log(newTicketsData);
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
        console.log(value, field, ticketsDataIndex, ticketIndex);

        let newTicketsData = {}
        Object.values(ticketsData).map((ticketType, index) => {
            console.log(ticketType);
            const idIngresso = ticketType[0].idIngresso;

            const newTicketData = ticketType.map((ticket, i) => {
                console.log(ticket);
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
        console.log(newTicketsData);
        setTicketsData(newTicketsData)
    }

    const handleShowPayment = () => {
        console.log(ticketsData);
        // setShowPayment(true);
        let showErrorTemp = false;
        Object.values(ticketsData).map((ticketType, index) => {
            ticketType.map((ticket, i) => {
                console.log(ticket);
                if (
                    ticket.name.length < 2
                    || !isValidCpf(ticket.cpf)
                    || ticket.phone.length < 10
                    || !isValidEmail(ticket.email)
                ) {
                    showErrorTemp = true;
                }
            })
        })
        console.log(showErrorTemp);
        if (showErrorTemp) {
            setShowInputErros(true);
            return toast.error("Preencha todos os campos para cada ingresso");
        }
        setShowInputErros(false);
        return setShowPayment(true);
    }

    const handleBackToTicketsData = () => {
        setShowPayment(false);
    }

    const handlePaymentMethod = (value) => {
        console.log(value);
        setPaymentMethod(value);
        if (value === 'cc') {
            setShowCreditCardFields(true);
        }else{
            setShowCreditCardFields(false);
        }
    }

    const handleChangeInstallmentNumber = (value) => {
        setInstallmentsNumber(value);
    }

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
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Evento</th>
                                    <th scope='col'>Ingresso</th>
                                    <th scope='col'>Quantidade</th>
                                    <th scope='col'>Valor</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems && cartItems.length > 0 &&
                                    cartItems.map((cartItem) => {
                                        console.log(cartItem);
                                        return (
                                            <tr key={cartItem.idInShoppingCar}>
                                                <td>
                                                    <div className='d-flex align-items-center crypto-image'>
                                                        <img src={cartItem?.foto} alt='image' />
                                                        <h3 className='mb-0 crypto-name'>{cartItem.nomeEvento}</h3>
                                                    </div>
                                                </td>
                                                <td>{cartItem.nome}</td>
                                                <td><span className='trending up'>{cartItem?.quantidade}</span></td>
                                                <td>{convertMoney(cartItem?.valor * cartItem?.quantidade)}</td>

                                                {
                                                    !showPayment &&
                                                    (
                                                        <td>
                                                            <div className='d-flex container-acoes'>


                                                                <div className='container-left'>
                                                                    <a class="btn btn-outline-danger" onClick={() => handleChangeTicketQuantity({ idInShoppingCart: cartItem.idInShoppingCar, quantity: cartItem.quantidade - 1, cartItem })}><span><i class="fa fa-minus"></i></span></a>
                                                                </div>
                                                                <div className='container-excluir' onClick={() => handleShowConfirmDeleteItem(cartItem.idInShoppingCar)}>
                                                                    <div><span><i className="fa fa-trash"></i></span></div>
                                                                    <div className='underline texto-excluir'>Excluir</div>
                                                                </div>
                                                                <div className='container-right'>
                                                                    <a class="btn btn-outline-success" onClick={() => handleChangeTicketQuantity({ idInShoppingCart: cartItem.idInShoppingCar, quantity: Number(cartItem.quantidade) + 1, cartItem })}><span><i class="fa fa-plus"></i></span></a>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </Row>
                {
                    showPayment &&
                    <Row>
                        <Col xs={12} sm={6}>
                            <a class="default-btn default-outline-btn checkout-button" type="button" onClick={() => handleBackToTicketsData()}><i className='bx bxs-left-arrow'></i>Voltar para escolha de ingressos</a>
                        </Col>
                    </Row>
                }
                <hr className='hr-divisor' />
                {
                    !showPayment && (
                        <>
                            <div className='section-title'>
                                <h2>Preencha as informações dos ingressos</h2>
                            </div>
                            {
                                Object.values(ticketsData).length > 0 ? (
                                    Object.values(ticketsData).map((ticketType, index) => (
                                        ticketType.map((ticket, i) => (
                                            <Row className='container-tickets-data'>
                                                <Col xs={12}>
                                                    <h4>{ticket.description}</h4>
                                                </Col>
                                                <Row className='container-tickets-inputs'>
                                                    {
                                                        (ticket.idIngresso === ticketIdUsingMyAccountData && i === 0)
                                                        || (!ticketIdUsingMyAccountData && i === 0) &&
                                                        <Col className='pb-3 pt-3' xs={12}>
                                                            <Form.Check
                                                                type='checkbox'
                                                                id={`default-checkbox`}
                                                                label={`Usar os dados da minha conta`}
                                                                onChange={(e) => handleUseMyAccountData({ checked: e.target.checked, ticketsDataIndex: index, ticketIndex: i, idIngresso: ticket.idIngresso })}
                                                            />
                                                        </Col>
                                                    }
                                                    <Col className='pb-3' xs={12} md={6}>
                                                        <Form.Control className={showInputErros && ticket.name.length < 2 ? 'input-error' : ''} type="text" value={ticket.name} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'name', ticketsDataIndex: index, ticketIndex: i })} name="nome_completo" placeholder="Nome Completo" />
                                                        {showInputErros && ticket.name.length < 2 && <Form.Text className="text-error">Informe o nome completo da pessoa que irá utilizar o ingresso.</Form.Text>}
                                                    </Col>
                                                    <Col className='pb-3' xs={12} md={6}>
                                                        <Form.Control className={showInputErros && !isValidCpf(ticket.cpf) ? 'input-error' : ''} type="text" value={ticket.cpf} onChange={(e) => handleChangeTicketData({ value: cpfMask(e.target.value), field: 'cpf', ticketsDataIndex: index, ticketIndex: i })} inputmode="numeric" name="cpf" placeholder="CPF" maxlength="14" />
                                                        {showInputErros && !isValidCpf(ticket.cpf) && <Form.Text className="text-error">Informe o cpf da pessoa que irá utilizar o ingresso.</Form.Text>}
                                                    </Col>
                                                    <Col className='pb-3' xs={12} md={6}>
                                                        <Form.Control className={showInputErros && ticket.phone.length < 10 ? 'input-error' : ''} type="text" value={ticket.phone} onChange={(e) => handleChangeTicketData({ value: phoneMaskForList(e.target.value), field: 'phone', ticketsDataIndex: index, ticketIndex: i })} inputmode="numeric" name="telefone" placeholder="Telefone" id="telefone_2" required="" maxlength="16" />
                                                        {showInputErros && ticket.phone.length < 10 && <Form.Text className="text-error">Informe um número válido (Enviaremos o qr code do ingresso por WhatsApp).</Form.Text>}
                                                    </Col>
                                                    <Col className='pb-3' xs={12} md={6}>
                                                        <Form.Control className={showInputErros && !isValidEmail(ticket.email) ? 'input-error' : ''} type="email" value={ticket.email} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} name="email" placeholder="Email" />
                                                        {showInputErros && !isValidEmail(ticket.email) && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                    </Col>
                                                </Row>
                                            </Row>
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
                    showPayment && (
                        <>
                            <Row className='container-checkout pb-5'>
                                <Col xs={12} sm={6}>
                                    {/* <div className='section-title'> */}
                                    <h3>Escolha a forma de pagamento</h3>
                                    {/* </div> */}
                                    <Form.Select value={paymentMethod} onChange={(e) => handlePaymentMethod(e.target.value)}>
                                        <option>Selecione uma opção</option>
                                        <option value="cc">Cartão de crédito - Taxa 7%</option>
                                        <option selected value="pix">PIX - Taxa 4%</option>
                                    </Form.Select>
                                </Col>

                                <Col xs={12} sm={6} className='pt-3'>
                                    {/* <div className='section-title'> */}
                                    <h3>Cupom de desconto</h3>
                                    {/* </div> */}
                                    <Form.Control placeholder='Insira o código aqui' />
                                </Col>
                            </Row>
                            {
                                showCreditCardFields && (
                                    <div className='container-credit-card-inputs'>
                                        <Row className='pb-4'>
                                            <Col xs={12}>
                                                <h3>Dados do Cartão</h3>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>Número do Cartão</Form.Label>
                                                    <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={creditCardData.number} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} placeholder="0000 0000 0000 0000" />
                                                    {showCheckoutInputErros && !isValidCreditCard(ticket.email) && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>Data de Vencimento</Form.Label>
                                                    <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={creditCardData.expirationDate} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} placeholder="00/00" />
                                                    {showCheckoutInputErros && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>Cod. Segurança</Form.Label>
                                                    <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={creditCardData.cvv} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} placeholder="000" />
                                                    {showCheckoutInputErros && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>Nome Impresso</Form.Label>
                                                    <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={creditCardData.name} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} />
                                                    {showCheckoutInputErros && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className='pb-4'>
                                            <Col xs={12}>
                                                <h3>Dados da Fatura</h3>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>CEP</Form.Label>
                                                    <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={billingData.cep} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} placeholder="00000-000" />
                                                    {showCheckoutInputErros && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>Endereço</Form.Label>
                                                    <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={billingData.address} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} />
                                                    {showCheckoutInputErros && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>Cidade</Form.Label>
                                                    <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={billingData.city} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} />
                                                    {showCheckoutInputErros && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>Estado</Form.Label>
                                                    <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={billingData.state} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} />
                                                    {showCheckoutInputErros && <Form.Text className="text-error">Informe um email válido (Enviaremos o qr code do ingresso).</Form.Text>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className='pb-4'>
                                            <Col xs={12}>
                                                <h3>Parcelamento</h3>
                                            </Col>
                                            <Col xs={12} md={6} className='pb-3'>
                                                <Form.Group>
                                                    <Form.Label>Quantas parcelas?</Form.Label>
                                                    <Form.Select value={installmentsNumber} onChange={(e) => handleChangeInstallmentNumber(e.target.value)}>
                                                        <option>Selecione uma opção</option>
                                                        <option value="cc">Cartão de crédito - Taxa 7%</option>
                                                        <option selected value="pix">PIX - Taxa 4%</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                        </>
                    )
                }
                {
                    showPayment && (
                        <Row>
                            <Col xs={12}>
                                <a class="default-btn checkout-button" type="button" onClick={() => handleShowPayment()}><i className='bx bxs-hand-right'></i>Finalizar</a>
                            </Col>
                        </Row>
                    )
                }
                {
                    Object.values(ticketsData).length > 0 && !showPayment && (
                        <Row>
                            <Col xs={12}>
                                <a class="default-btn checkout-button" type="button" onClick={() => handleShowPayment()}><i className='bx bxs-hand-right'></i>Ir para pagamento</a>
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
