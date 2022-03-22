import { useState, useEffect } from 'react';
import axios from 'axios';
import shoppingCartService from '../../services/cart';
import { convertMoney, dateLastAccess } from '../../utils/strings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import servicesEventozz from '../../services/events';
import { scrollToElement } from '../../utils/scrollTo';
import { useRouter } from 'next/router';

const Banner = ({ item, handleCheckout, syncCartItems }) => {
  const router = useRouter();
  const dados = item;
  const [tickets, setTickets] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  //converter hook
  const [image, setImage] = useState('/images/voucher.png');
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  useEffect(() => {
    if (dados?.id != undefined) {
      getTickets();
    }
  }, [dados?.id, syncCartItems]);

  async function getTickets() {
    const accessToken = window.localStorage.getItem("accessToken");

    const result = await servicesEventozz.getTickets(dados?.id);
    if (result.status == 200) {
      let ticketTypesInfo = result?.data?.data;
      let ingressos = [];

      if (accessToken) {
        const resultClient = await shoppingCartService.listShoppingCart(dados?.id, accessToken);
        let vectorClient = resultClient?.data?.data;
        if (vectorClient?.length === 0) {
          ticketTypesInfo.map(a => {
            a.quantidade = 0;
            a.activeValue = a.valor;
            ingressos.push(a);
          });
          setTickets(ingressos)
        } else {
          console.log(ticketTypesInfo);
          console.log(vectorClient);
          ticketTypesInfo.map(a => {
            let hasTicketsInCart = false;
            vectorClient?.map((b) => {
              if (b.idIngresso == a.id) {
                a.quantidade = Number(b.quantidade);
                a.activeValue = a.qtd_promocional > 0 && Number(b.quantidade) >= a.qtd_promocional ? a.valor_promocional : a.valor;
                ingressos.push(a);
                hasTicketsInCart = true;
              }
            });
            if (!hasTicketsInCart) {
              ingressos.push({
                ...a,
                activeValue: a.valor,
                quantidade: 0
              });
            }
          });
          setTickets(ingressos)
        }
      } else {
        ticketTypesInfo.map(a => {
          a.quantidade = 0;
          a.activeValue = a.valor;
          ingressos.push(a);
        });
        setTickets(ingressos);
      }
      let totalValue = 0;
      let taxa = Number(dados?.taxa);
      ingressos.map(a => {
        totalValue += a.quantidade * a.activeValue;
      });
      setValorTotal(totalValue);
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

    let totalValue = 0;
    let taxa = Number(dados.taxa);
    tickets.map(a => {
      totalValue += a.quantidade * a.activeValue;
    });
    setValorTotal(totalValue)
  }

  async function addCar(type) {
    let accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      var car = [];
      var value = 0;
      tickets.map((x) => {
        if (x.quantidade > 0) {
          car.push(x);
          value += 1;
        } else {
          car.push(x);
        }
      });

      if (value != 0) {

        setIsLoadingFinish(true);
        const result = await shoppingCartService.saveShoppingCart(car, accessToken);
        setIsLoadingFinish(false);
        if (result.status == 200) {
          toast.success('Ingressos adicionados ao carrinho', {
            position: "bottom-left",
            autoClose: 2000
          })

          handleCheckout()
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
      toast.error('É necessário fazer login para continuar', {
        autoClose: 2000
      })
      setTimeout(function () {
        router.push({pathname:"/login", query: {callback: router.asPath}});
      }, 2000);
    }
  }

  const handleChangeTicketQuantity = async (option, ticketId) => {
    console.log(tickets);
    let errorStatus = {
      negative: false,
      maxQuantity: false
    }
    const newTickets = await Promise.all(tickets.map((a, i) => {
      let activeValue = a.valor;
      if (a.id === ticketId) {
        if (option === 'plus' && a.quantidade + 1 > a.qtd_disponivel) {
          errorStatus.maxQuantity = true;
        }
        if (option === 'minus' && a.quantidade - 1 < 0) {
          errorStatus.negative = true;
        }

        if (option === 'plus') {
          activeValue = a.qtd_promocional > 0 && a.quantidade + 1 >= a.qtd_promocional ? a.valor_promocional : a.valor;
        }
        if (option === 'minus') {
          activeValue = a.qtd_promocional > 0 && a.quantidade - 1 >= a.qtd_promocional ? a.valor_promocional : a.valor;
        }
        return {
          ...a,
          activeValue,
          quantidade: option === 'minus' ? a.quantidade - 1 : a.quantidade + 1
        }
      } else {
        return {
          ...a
        }
      }
    })
    )

    if (errorStatus.negative) return;

    if (errorStatus.maxQuantity) return toast.info("A quantidade informada não está mais disponível");

    let totalValue = 0;
    let taxa = Number(dados.taxa);
    newTickets.map(a => {
      totalValue += a.quantidade * a.activeValue;
    });
    setValorTotal(totalValue)

    setTickets(newTickets);
  }

  return (
    <>
      {/* <ToastContainer /> */}

      <div className='trade-cryptocurrency-area ptb-100' id="tickets-sale-area"
        style={{
          background:
            dados?.cor_principal ?
              (dados?.cor_principal) :
              ('linear-gradient(0deg, #0062ff, #081587)')
        }}
      >
        <div className='container'>
          <div className='row align-items-center'>

            <div className='col-12'>

              <div className='trade-cryptocurrency-box'>
                {
                  isLoadingFinish && (
                    <div className='container-spinner'>
                      <div class="spinner-border absolute" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  )
                }
                {
                  tickets.length > 0 ? (
                    <>
                      <div className='section-title'>
                        <h2>Confira nossos ingressos</h2>
                      </div>
                      <div className='d-flex justify-content-evenly row'>
                        {tickets.map((ticket, index) => {
                          return (
                            <div className="col-lg-3 col-md-6 col-sm-10 ticket-animate">
                              <div className="box-ticket animate">
                                <h3>{ticket.nome}</h3>
                                <div className="price-box-ticket">{dados?.is_free ? 'Gratuito' : convertMoney(ticket.activeValue)}</div>
                                <ul>
                                </ul>
                                <div className="row mt-5 mb-5">
                                  <div className="col-md-4 col-lg-4 col-4 col-xl-4">
                                    <a style={{ fontSize: 40 }} className="btn btn-outline-danger" onClick={() => handleChangeTicketQuantity('minus', ticket.id)}><span><i className="fa fa-minus"></i></span></a>
                                  </div>
                                  <div style={{ margin: 'auto' }} className="col-md-4 col-lg-4 col-4 col-xl-4">
                                    <span id="quantidade_ingressos2">{ticket.quantidade}</span>
                                  </div>
                                  <div className="col-md-4 col-lg-4 col-4 col-xl-4">
                                    <a style={{ fontSize: 40 }} className="btn btn-outline-success" onClick={() => handleChangeTicketQuantity('plus', ticket.id)}><span><i className="fa fa-plus"></i></span></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            // <div className="col-lg-3 col-md-6 ticket-animate"></div>
                          )
                        })}
                      </div>

                      <div className='d-flex align-items-center justify-content-center'>
                        <div className='align-items-end d-flex'>
                          <span className='box-tickets-total-value-title'>
                            <div className='d-block div-title'>Valor Total</div>
                            {!dados?.is_free && <small>(Sem taxas inclusas)</small>}
                          </span>
                        </div>
                        <span className='box-tickets-total-value-text'>{dados?.is_free ? 'Gratuito' : convertMoney(valorTotal)}</span>
                      </div>

                      <div className="box-button-landing justify-content-center" >

                        <a className="default-btn tickets-button"
                          style={{ backgroundColor: dados?.cor_secundaria ? (dados?.cor_secundaria) : ('#001d4a'), marginTop: 25 }}
                          onClick={() => { addCar('comprar') }}
                        >
                          Finalizar<i className='btn-comprar-agora bx bx-money'></i>
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="event-empty-tickets">
                      <span
                        style={{ color: dados?.cor_secundaria ? (dados?.cor_secundaria) : ('#012970') }}
                      >NENHUM INGRESSO DISPONÍVEL NO MOMENTO</span>
                    </div>
                  )
                }

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

export default Banner;
