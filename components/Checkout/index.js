
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { convertMoney } from '../../utils/strings';
import PageBanner from '../Common/PageBanner';

const Checkout = ({ dados, cartItems, handleChangeTicketQuantity, handleDeleteItem, isLoadingCartItem }) => {

    const [deletedTicketId, setDeletedTicketId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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
                <button type="button" class="btn btn-danger" onClick={() => handleConfirmDeleteItem(deletedTicketId)}>Confirmar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => handleCancelDeleteTicket()}>Cancelar</button>
            </Modal.Footer>
        </Modal>
    )

    return (
        <div className='container' id='container-checkout'>
            <PageBanner
                pageTitle='Finalizar Compra'
                pageSubTitle='Aqui estão todos os ingressos que você escolheu, vamos finalizar?'
            />
            <div className='container pb-70'>
                <div className='row'>
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
                </div>
            </div>
            {showConfirmModal && <ConfirmDeleteModal />}
        </div>
    );
};

export default Checkout;
