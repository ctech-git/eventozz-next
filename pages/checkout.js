import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import PageBanner from '../components/Common/PageBanner';
import PaymentArea from '../components/Trade/PaymentArea';
import shoppingCartService from '../services/cart';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  //paginate
  const [pageNumber, setpageNumber] = useState(0);
  const coinsPerPage = 20;
  const pagesVisited = pageNumber * coinsPerPage;

  const getCartItems = useCallback(async () => {

    const result = await shoppingCartService.listShoppingCartAll();
    console.log("=====")
    var data = result?.data?.data;
    console.log(data)
    setCartItems(data);
  }, []);

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <PageBanner
        pageTitle='Finalizar Compra'
        pageSubTitle='Aqui estão todos os ingressos que você escolheu, vamos finalizar?'
      />
      <div className='container pb-70'>
        <div className='row'>
          <div className='cryptocurrency-table table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Evento</th>
                  <th scope='col'>Ingresso</th>
                  <th scope='col'>Quantidade</th>
                  <th scope='col'>Valor</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems && cartItems.length > 0 &&
                  cartItems.map((cardItem) => {
                    console.log(cardItem);
                    return (
                      <tr key={cardItem.idInShoppingCar}>
                        <td>
                          <div className='d-flex align-items-center crypto-image'>
                            <img src={cardItem?.foto} alt='image' />
                            <h3 className='mb-0 crypto-name'>{cardItem.nomeEvento}</h3>
                          </div>
                        </td>
                        <td>{cardItem.nome}</td>
                        <td><span className='trending up'>{cardItem?.quantidade}</span></td>
                        <td>R$ {cardItem?.valor}</td>
                        <td><a className='link-btn'>Trade</a></td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PaymentArea />

    </>
  );
};

export default Checkout;
