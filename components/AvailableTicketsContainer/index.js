import { useState, useEffect } from 'react';
import shoppingCartService from '../../services/cart';
import { convertMoney } from '../../utils/strings';
import servicesEventozz from '../../services/events';
import { Col, Row } from 'react-bootstrap';
import { ButtonEventozz } from '../ButtonEventozz';
import { TicketCard } from '../TicketCard';
import { toast } from 'react-toastify';
import { useCart } from '../../context/cart';
import { SimplifiedAuthContainer } from '../Authentication/SimplifiedAuthContainer';
import { useAuth } from '../../context/auth';
import { scrollToElement } from '../../utils/scrollTo';

export const AvailableTicketsContainer = ({ item, handleCheckout, syncCartItems }) => {
  const dados = item;
  const [tickets, setTickets] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [showSimplifiedLogin, setShowSimplifiedLogin] = useState(false);

  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const { cartId, handleChangeCartId } = useCart();
  const { userToken } = useAuth()

  useEffect(() => {
    if (dados?.id != undefined) {
      getTickets();
    }
  }, [dados?.id, syncCartItems, cartId]);

  useEffect(() => {
    console.log(showSimplifiedLogin);
    console.log(userToken);
    if (showSimplifiedLogin && userToken) {
      addTicketsToCart()
    }else if(showSimplifiedLogin && !userToken){
      console.log('there');
      setTimeout(() => {
        console.log('here');
        scrollToElement({id: 'icon-botao-finalizar'})
      }, 1000);
    }
  }, [userToken, showSimplifiedLogin])

  async function getTickets() {

    const result = await servicesEventozz.getTickets(dados?.id);
    if (result.status == 200) {
      let ticketTypesInfo = result?.data?.data;
      let ingressos = [];
      if (cartId) {
        const resultClient = await shoppingCartService.listShoppingCart({ eventId: dados?.id, cartId });
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

  async function addTicketsToCart() {

    try {
      if (!userToken) {
        setShowSimplifiedLogin(true);
        return toast.warning("Faça login para finalizar a compra");
      }
      const cart = [...tickets];
      // console.log(tickets);
      // console.log(syncCartItems);
  
      const hasTicketsInCart = tickets.find(ticket => ticket.quantidade > 0);
  
      if (hasTicketsInCart) {
  
        setIsLoadingFinish(true);
        const result = await shoppingCartService.saveShoppingCart({ cart, cartId });
        setIsLoadingFinish(false);
        if (result.status == 200 && result?.data?.cartId) {
          if (!cartId) {
            handleChangeCartId(result?.data?.cartId);
          }
          toast.success('Ingressos adicionados ao carrinho', {
            position: "bottom-left",
            autoClose: 2000
          })
  
          handleCheckout({cartIdTemp: result?.data?.cartId})
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
    } catch (error) {
      console.log('error addTicketsToCart -> ', error);
    }
   

  }

  const handleChangeTicketQuantity = async (option, ticketId) => {
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
    <Col xs={12}>
      <div className='trade-cryptocurrency-area ptb-100' id="tickets-sale-area"
        style={{
          background:
            dados?.cor_principal ?
              (dados?.cor_principal) :
              ('linear-gradient(0deg, #0062ff, #081587)')
        }}
      >
        <div className='container'>
          <Row className='align-items-center'>
            <Col xs={12}>

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
                      <Row className='d-flex justify-content-evenly'>
                        {tickets.map(ticket => {
                          return (
                            <TicketCard key={ticket.id} onChangeTicketQuantity={handleChangeTicketQuantity} ticket={ticket} isFree={dados?.is_free} />
                          )
                        })}
                      </Row>

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

                        <ButtonEventozz backgroundColor={dados?.cor_secundaria ? dados?.cor_secundaria : '#001d4a'} callback={addTicketsToCart} marginTop={25}>
                          Finalizar<i id='icon-botao-finalizar' className='btn-comprar-agora bx bx-money'></i>
                        </ButtonEventozz>
                      </div>
                      {
                        showSimplifiedLogin && !userToken ? <SimplifiedAuthContainer /> : null
                      }
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
            </Col>
          </Row>
        </div>
        <div className='lines'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
    </Col>
  );
};
