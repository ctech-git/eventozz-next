import { Col, Row } from "react-bootstrap"
import Image from 'next/image'
import { convertMoney } from "../../../utils/strings"

export function MobileTicketsTable({ cartItems, dados, totalTickets, showPayment, hideOnCheckout, handleChangeTicketQuantity, handleShowConfirmDeleteItem ,
    paymentMethod, pixValue, installmentOptions }) {
    return (
        <>
            {cartItems && cartItems.length > 0 &&
                cartItems.map((cartItem) => {
                    return (
                        <div className='container-ticket-responsivo'>
                            <Row className='pb-2'>
                                <Col xs={4}>
                                    <Image src={cartItem?.foto} className='image-evento-tabela' alt='image' width={100} height={83} />
                                </Col>
                                <Col xs={8}>
                                    <label>Evento</label>
                                    <h3 className='mb-0 crypto-name'>{cartItem.nomeEvento}</h3>
                                </Col>
                            </Row>
                            <Row className='pb-2'>
                                <Col xs={12}>
                                    <label>Tipo de ingresso</label>
                                    <h6>{cartItem.nome}</h6>
                                </Col>
                            </Row>
                            <Row className='pb-2'>
                                <Col xs={6}>
                                    <label>Quantidade</label>
                                    <h6>{cartItem?.quantidade}</h6>
                                </Col>
                                <Col xs={6}>
                                    <label>Valor Total</label>
                                    <h6>{dados?.is_free ? 'Gratuito' : convertMoney((cartItem.qtdPromocional > 0 && Number(cartItem.quantidade) >= cartItem.qtdPromocional ? cartItem.valorPromocional : cartItem.valor) * cartItem?.quantidade)}</h6>
                                </Col>
                            </Row>
                            {
                                !showPayment && !hideOnCheckout &&
                                (<Row className='pb-2'>
                                    <Col xs={12}>
                                        <div className='container-acoes-responsivo d-flex justify-content-center pt-3'>


                                            <div className='container-left'>
                                                <a className="btn btn-outline-danger" onClick={() => handleChangeTicketQuantity({ idInShoppingCart: cartItem.idInShoppingCar, quantity: cartItem.quantidade - 1, cartItem })}><span><i className="fa fa-minus"></i></span></a>
                                            </div>
                                            <div className='container-excluir' onClick={() => handleShowConfirmDeleteItem(cartItem.idInShoppingCar)}>
                                                <div><span><i className="fa fa-trash"></i></span></div>
                                                <div className='underline texto-excluir'>Excluir</div>
                                            </div>
                                            <div className='container-right'>
                                                <a className="btn btn-outline-success" onClick={() => handleChangeTicketQuantity({ idInShoppingCart: cartItem.idInShoppingCar, quantity: Number(cartItem.quantidade) + 1, cartItem })}><span><i className="fa fa-plus"></i></span></a>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                                )}
                        </div>
                    )
                })
            }
            <div className='container-ticket-responsivo resumo'>
                <Row className='pb-2'>
                    <Col xs={12}>
                        <label>{
                            dados?.is_free ? (
                                'Total'
                            ) : (
                                'Total (com taxas administrativas)'
                            )}
                        </label>
                        {dados?.is_free ? <h3 className='mb-0 crypto-name'>Gratuito</h3> :
                            <h3 className='mb-0 crypto-name'>{paymentMethod === 'pix' ?
                                pixValue ? convertMoney(pixValue) : ''
                                : installmentOptions[0]?.value ?
                                    `A partir de ${convertMoney(installmentOptions[0]?.totalValue)}`
                                    : ''}</h3>}
                    </Col>
                </Row>
                <Row className='pb-2'>
                    <Col xs={12}>
                        <label>Quantidade de ingressos</label>
                        <h6>{totalTickets}</h6>
                    </Col>
                </Row>
            </div>
        </>
    )
}