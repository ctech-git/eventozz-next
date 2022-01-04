import { useState, useEffect } from 'react';
import axios from 'axios';
import showppingCartService from '../../services/cart';
import { convertMoney, dateLastAccess } from '../../utils/strings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import servicesEventozz from '../../services/events';



const Banner = ({ item }) => {
  console.log(item);
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
    const acessToken = window.localStorage.getItem("AcessToken");

    const result = await servicesEventozz.getTickets(dados?.id);
    if (result.status == 200) {
      let ticketTypesInfo = result?.data?.data;
      console.log(ticketTypesInfo)
      let ingressos = [];

      if (acessToken) {
        const resultClient = await showppingCartService.listShoppingCar(dados?.id, acessToken);
        let vectorClient = resultClient?.data?.data;
        console.log(vectorClient);
        if (vectorClient.length === 0) {
          ticketTypesInfo.map(a => {
            a.quantidade = 0;
            a.activeValue = a.valor;
            ingressos.push(a);
          });
          console.log(ingressos);
          setTickets(ingressos)
        } else {
          ticketTypesInfo.map(a => {
            vectorClient.map((b) => {
              if (b.id == a.id) {
                a.quantidade = Number(b.quantidade);
                a.activeValue = a.qtd_promocional > 0 && Number(b.quantidade) >= a.qtd_promocional ? a.valor_promocional : a.valor;
                ingressos.push(a);
              }
            });
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
        console.log(a);
        totalValue += a.quantidade * a.activeValue;
      });
      console.log(totalValue);
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

  const handleChangeTicketQuantity = async (option, ticketId) => {
    console.log(tickets);
    let errorStatus = {
      negative: false,
      maxQuantity: false
    }
    const newTickets = await Promise.all(tickets.map((a, i) => {
      if (a.id === ticketId) {
        if (option === 'plus' && a.quantidade + 1 > a.qtd_disponivel) {
          errorStatus.maxQuantity = true;
        }
        if (option === 'minus' && a.quantidade - 1 < 0) {
          errorStatus.negative = true;
        }
        return {
          ...a,
          quantidade: option === 'minus' ? a.quantidade - 1 : a.quantidade + 1,
          activeValue: a.qtd_promocional > 0 && a.quantidade + 1 >= a.qtd_promocional ? a.valor_promocional : a.valor
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

    console.log(newTickets);

    let totalValue = 0;
    let taxa = Number(dados.taxa);
    newTickets.map(a => {
      console.log(a);
      totalValue += a.quantidade * a.activeValue;
    });
    console.log(totalValue);
    setValorTotal(totalValue)

    setTickets(newTickets);
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
                  <h2>Confira nossos ingressos</h2>
                </div>
                <div className='d-flex justify-content-evenly row'>
                  {tickets.map((ticket, index) => {
                    console.log(ticket);
                    return (
                      // <div className='currency-selection'>
                      //   <label>Quantidade</label>
                      //   <input
                      //     type='number' value={tickets[index]?.quantidade ? (tickets[index]?.quantidade) : (0)}
                      //     onChange={(e) => handlerTicketValue(e.target.value, ticket.id)}
                      //   />
                      //   <div className={'width-select dropdown'}>
                      //     <div className="box-ticket-buy">
                      //       <img src={image} alt='image' />
                      //       {ticket.nome}
                      //     </div>
                      //   </div>
                      // </div>

                      <div className="col-lg-3 col-md-6 col-sm-10 ticket-animate">
                        <div className="box-ticket animate">
                          <h3>{ticket.nome}</h3>
                          <div className="price-box-ticket">{convertMoney(ticket.activeValue)}</div>
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
                      <small>(Sem taxas inclusas)</small>
                    </span>
                  </div>
                  <span className='box-tickets-total-value-text'>{convertMoney(valorTotal)}</span>
                </div>

                <div className="box-button-landing justify-content-center" >
                  {/* <button type='button'
                    style={{ backgroundColor: dados?.cor_secundaria ? (dados?.cor_secundaria) : ('#00a79d') }}
                    onClick={() => { addCar('add') }}
                  >
                    <i className='fa fa-plus'></i> Adicionar
                  </button> */}
                  <button type='button'
                    style={{ backgroundColor: dados?.cor_secundaria ? (dados?.cor_secundaria) : ('#00a79d') }}
                    onClick={() => { addCar('comprar') }}
                  >
                    <i className='bx bxs-hand-right'></i> Finalizar
                  </button>
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

export default Banner;
