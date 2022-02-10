import { useState, useEffect } from 'react';
import axios from 'axios';
import shoppingCartService from '../../services/cart';
import { dateLastAccess } from '../../utils/strings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import servicesEventozz from '../../services/events';
import { scrollToElement } from '../../utils/scrollTo';



const EventDetails = ({ item, showTicketSale }) => {
  const dados = item;
  console.log(dados);
  return (
    <>

      <div className='trade-cryptocurrency-area ptb-100'
        style={{ background: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
      >
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-12'>
              <div className='trade-cryptocurrency-box'>

                <div className='section-title'>
                  <h2>Detalhes do Evento</h2>
                </div>
                <div className='row'>
                  <div className='col-lg-6 col-md-12'>
                    <div className='earn-money-list'>
                      <ul>
                        <li>
                          <i className='fa fa-map'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          {dados.local_evento}
                        </li>
                        <li>
                          <i className='bx bx-cog'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          {dados.organizador}
                        </li>
                        <li>
                          <i className='bx bxs-barcode'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          Apresentar Qr Code na Entrada
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='earn-money-list'>
                      <ul>
                        <li>
                          <i className='bx bxs-badge-check'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          {dados.categoria_evento}
                        </li>
                        <li>
                          <i className='bx bx-calendar'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          Inicio: {dateLastAccess(dados.data_inicio)} <br/>Fim: {dateLastAccess(dados.data_fim)}
                        </li>
                        <li>
                          <i className="fa fa-clock" aria-hidden="true"
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          De {dados.hora_inicio} até {dados.hora_fim}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* {showTicketSale && <div onClick={() => scrollToElement({id: 'tickets-sale-area'})} className="justify-content-center pt-4 row btn-compre-agora absolute"><a className="default-btn"><i className="bx bxs-chat"></i>{dados?.is_free ? 'Reservar ingresso' : 'Comprar agora'}</a></div>} */}
                <div className='section-title pt-100'>
                  <div key={'x-event'} dangerouslySetInnerHTML={{
                    __html: dados.descricao,
                  }}>

                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div className='lines'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
