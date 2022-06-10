import Image from 'next/image'
import { convertMoney } from '../../../utils/strings'

export function TicketsTable({ cartItems, showPayment, hideOnCheckout, handleChangeTicketQuantity, handleShowConfirmDeleteItem, couponInfo,
                                totalTickets, dados, paymentMethod, pixValue, installmentOptions }) {
    return (
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
                        return (
                            <tr key={cartItem.idInShoppingCar}>
                                <td>
                                    <div className='d-flex align-items-center crypto-image'>
                                        <Image src={cartItem?.foto} alt='image' width={120} height={90} />
                                        <h3 className='mb-0 crypto-name'>{cartItem.nomeEvento}</h3>
                                    </div>
                                </td>
                                <td>{cartItem.nome}</td>
                                <td><span className='trending up'>{cartItem?.quantidade}</span></td>
                                <td>{dados?.is_free ? 'Gratuito' : convertMoney((cartItem.qtdPromocional > 0 && Number(cartItem.quantidade) >= cartItem.qtdPromocional ? cartItem.valorPromocional : cartItem.valor) * cartItem?.quantidade)}</td>

                                {
                                    !showPayment && !hideOnCheckout &&
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
                {
                    couponInfo?.value && couponInfo?.code && (
                        <tr>
                            <td><h3 className='mb-0 crypto-name'>Cupom</h3></td>
                            <td>{couponInfo.code}</td>
                            <td></td>
                            <td>{couponInfo.value}</td>
                            <td></td>
                        </tr>
                    )
                }
                <tr>
                    <td><h3 className='mb-0 crypto-name'>{dados?.is_free ? 'Total' : 'Total (com taxas administrativas)'}</h3></td>
                    <td></td>
                    <td>{totalTickets}</td>
                    <td>{dados?.is_free ? ('Gratuito') :
                        (paymentMethod === 'pix' ?
                            (pixValue ? convertMoney(pixValue) : '')
                            : (installmentOptions[0]?.value ? `A partir de ${convertMoney(installmentOptions[0]?.totalValue)}` : ''))}
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}