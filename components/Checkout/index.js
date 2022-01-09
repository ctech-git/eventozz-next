
import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import checkoutService from '../../services/checkout';
import { convertMoney, cpfMask, phoneMaskForList } from '../../utils/strings';
import PageBanner from '../Common/PageBanner';

const Checkout = ({ dados, cartItems, handleChangeTicketQuantity, handleDeleteItem, isLoadingCartItem }) => {

    const [deletedTicketId, setDeletedTicketId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [ticketsData, setTicketsData] = useState([]);
    const [ticketIdUsingMyAccountData, setTicketIdUsingMyAccountData] = useState(null);
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
    const [textLoading, setTextLoading] = useState('Buscando dados da conta');
    
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
                const data = result.data;
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
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </Row>
                <hr className='hr-divisor' />
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
                                                <Form.Control type="text" value={ticket.name} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'name', ticketsDataIndex: index, ticketIndex: i })} name="nome_completo" placeholder="Nome Completo" />
                                            </Col>
                                            <Col className='pb-3' xs={12} md={6}>
                                                <Form.Control type="text" value={ticket.cpf} onChange={(e) => handleChangeTicketData({ value: cpfMask(e.target.value), field: 'cpf', ticketsDataIndex: index, ticketIndex: i })} inputmode="numeric" name="cpf" placeholder="CPF" maxlength="14" />
                                            </Col>
                                            <Col className='pb-3' xs={12} md={6}>
                                                <Form.Control type="text" value={ticket.phone} onChange={(e) => handleChangeTicketData({ value: phoneMaskForList(e.target.value), field: 'phone', ticketsDataIndex: index, ticketIndex: i })} inputmode="numeric" name="telefone" placeholder="Telefone" id="telefone_2" required="" maxlength="16" />
                                            </Col>
                                            <Col className='pb-3' xs={12} md={6}>
                                                <Form.Control type="email" value={ticket.email} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} name="email" placeholder="Email" />
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
                {
                    Object.values(ticketsData).length > 0 && (
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
