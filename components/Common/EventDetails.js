import { useState, useEffect } from 'react';
import axios from 'axios';
import showppingCartService from '../../services/cart';
import { dateLastAccess } from '../../utils/strings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import servicesEventozz from '../../services/events';



const EventDetails = ({item, showTicketSale}) => {
  const dados = item;
  const [tickets, setTickets] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  //converter hook
  const [image, setImage] = useState('/images/voucher.png');

  useEffect(() => {
    if (dados?.id != undefined) {
      getTickets();
    }
  }, [dados?.id]);

  async function getTickets() {
    let AcessToken = window.localStorage.getItem("AcessToken");

    const result = await servicesEventozz.getTickets(dados?.id);
    if (result.status == 200) {
      var vector = result?.data?.data;
      console.log(vector)
      var ingressos = [];

      if (AcessToken) {
        const resultClient = await showppingCartService.listShoppingCar(dados?.id, AcessToken);
        var vectorClient = resultClient?.data?.data;
        console.log(vectorClient);
        if (vectorClient.length == 0) {
          vector.map((x) => {
            x['quantidade'] = 0;
            ingressos.push(x)
          });
          setTickets(ingressos)
        } else {
          vector.map((x) => {
            vectorClient.map((y) => {
              if (y.id == x.id) {
                x['quantidade'] = Number(y.quantidade);
                ingressos.push(x)
              }
            });
          });
          setTickets(ingressos)
        }
      } else {
        vector.map((x) => {
          x['quantidade'] = 0;
          ingressos.push(x)
        });
        setTickets(ingressos)
      }
      let value_calc = 0;
      let taxa = Number(dados?.taxa);
      ingressos.map((x, index) => {
        value_calc += Number((((Number(x.quantidade)) * (1 + (taxa / 100)) * (Number(x.valor)))).toFixed(1));
      });
      setValorTotal(value_calc)
    } else {
      toast.error('Nenhum Ingresso Encontrado', {
        position: "bottom-left",
        autoClose: 2000
      })
    }

  }

  function handlerTicketValue(value, id) {
    let ingressos = [];
    tickets.map((x, index) => {
      if (id == x.id) {
        x['quantidade'] = Number(value);
        ingressos.push(x)
      } else {
        ingressos.push(x)
      }
    });
    setTickets(ingressos)

    let value_calc = 0;
    let taxa = Number(dados.taxa);
    tickets.map((x, index) => {
      value_calc += Number((((Number(x.quantidade)) * (1 + (taxa / 100)) * (Number(x.valor)))).toFixed(1));
    });
    setValorTotal(value_calc)
  }

  async function addCar(type) {
    let AcessToken = window.localStorage.getItem("AcessToken");
    if (AcessToken) {
      var car = [];
      var value = 0;
      tickets.map((x) => {
        if (x.quantidade != 0) {
          car.push(x);
          value += 1;
        } else {
          car.push(x);
        }
      });

      if (value != 0) {
        const result = await showppingCartService.saveShoppingCar(car, AcessToken);
        if (result.status == 200) {
          toast.success('Ingressos adicionados ao carrinho', {
            position: "bottom-left",
            autoClose: 2000
          })

          if (type != 'add') {
            window.location.href = "/prices";
          }
        } else {
          toast.error('Error ao adicionar ao carrinho', {
            position: "bottom-left",
            autoClose: 2000
          })
        }
      } else {
        toast.error('Necessario selecionar ingresso', {
          position: "bottom-left",
          autoClose: 2000
        })
      }


    } else {
      toast.error('Faça login', {
        position: "bottom-left",
        autoClose: 2000
      })
      setTimeout(function () {
        window.location.href = "/authentication";
      }, 2000);
    }
  }

  return (
    <>
      <ToastContainer />

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
                          <i className='bx bxs-badge-check'
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
                          Inicio: {dateLastAccess(dados.data_inicio)} - Fim: {dateLastAccess(dados.data_fim)}
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
                {showTicketSale && <div className="justify-content-center pt-4 row btn-compre-agora absolute"><a className="default-btn"><i className="bx bxs-chat"></i>Comprar agora</a></div>}

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
