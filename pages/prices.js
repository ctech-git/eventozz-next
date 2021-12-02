import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import PageBanner from '../components/Common/PageBanner';
import PaymentArea from '../components/Trade/PaymentArea';
import ServicesEventozz from '../services/events';

const Prices = () => {
  const [newData, setnewData] = useState([]);
  //search
  const [q, setQ] = useState('');
  //selec value
  //paginate
  const [pageNumber, setpageNumber] = useState(0);
  const coinsPerPage = 20;
  const pagesVisited = pageNumber * coinsPerPage;

  useEffect(() => {
    const getCoins = async () => {
      let AcessToken = window.localStorage.getItem("AcessToken");

      const result = await ServicesEventozz.listShoppingCarAll(AcessToken);
      console.log("=====")
      var data = result?.data?.data;
      console.log(data)
      setnewData(data);
    };
    getCoins();
  }, []);

  const search = (rows) => {
    return rows.filter((row) => row.nome.toLowerCase().indexOf(q) > -1);
  };

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
                {newData && newData.length > 0 &&
                  search(newData)
                    .slice(0 || pagesVisited, pagesVisited + coinsPerPage)
                    .map((data) => (
                      <tr key={data.idInShoppingCar}>
                        <td>
                          <div className='d-flex align-items-center crypto-image'>
                            <img src={data?.foto} alt='image' />
                            <h3 className='mb-0 crypto-name'>{data.nome_evento}</h3>
                          </div>
                        </td>
                        <td>{data.nome}</td>
                        <td><span className='trending up'>{data?.quantidade}</span></td>
                        <td>R$ {data?.valor}</td>
                        <td><a className='link-btn'>Trade</a></td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PaymentArea />

    </>
  );
};

export default Prices;
