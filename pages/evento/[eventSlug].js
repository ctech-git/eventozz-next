import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { Row, Col } from 'react-bootstrap';

import Banner from '../../components/Common/Banner';
import Features from '../../components/Trade/Features';
import PaymentArea from '../../components/Trade/PaymentArea';
import RegisterArea from '../../components/Common/RegisterArea';
import servicesEventozz from '../../services/events';
import TokensArea from '../../components/HomeThree/TokensArea';
import EventDetails from '../../components/Common/EventDetails';

//Imagens
import BannerImg1 from '../../public/images/banner/banner-img1.webp';
import Shape1 from '../../public/images/shape/shape1.png';
import Shape2 from '../../public/images/shape/shape2.png';
import Shape3 from '../../public/images/shape/shape3.png';
import Shape5 from '../../public/images/shape/shape5.png';
import Shape9 from '../../public/images/shape/shape9.png';
import { scrollToElement } from '../../utils/scrollTo';
import shoppingCartService from '../../services/cart';
import { toast } from 'react-toastify';
import Checkout from '../../components/Checkout';

const Event = ({ event, isActive, showEventSoon, showTicketSale, showClosedSales, eventDate }) => {

  const router = useRouter();
  const { query } = useRouter();
  const seller = query?.vendedor;
  const [eventDay, setEventDay] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isLoadingCartItem, setIsLoadingCartItem] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [hideOnCheckout, setHideOnCheckout] = useState(false);

  useEffect(() => {
    if (eventDate != '') {
      const eventDayAux = new Date(eventDate);
      setEventDay(eventDayAux)
    }
  }, [eventDate]);

  const getCartItems = async () => {
    setIsLoadingCartItem(true);
    const accessToken = window.localStorage.getItem("accessToken");
    const result = await shoppingCartService.listShoppingCart(event.id, accessToken);
    var data = result?.data?.data;
    if (data?.length > 0) {
      setCartItems(data);
      setShowCheckout(true);
      scrollToElement({ id: 'container-checkout' });
    } else {
      return toast.info("Não encontramos nenhum ingresso no seu carrinho");
    }
    setIsLoadingCartItem(false);
  };

  const handleChangeTicketQuantity = async ({ idInShoppingCart, quantity, cartItem }) => {
    if (quantity > cartItem.qtdDisponivel) {
      return toast.info("A quantidade informada não está mais disponível");
    }

    if (quantity < 0) {
      return;
    }
    // return;
    const accessToken = window.localStorage.getItem("accessToken");
    setIsLoadingCartItem(true);
    const result = await shoppingCartService.updateQuantityShoppingCart({ idInShoppingCart, quantity, accessToken });
    var data = result?.data;
    if (data?.success) {
      getCartItems();
      // setCartItems(data);
      // setShowCheckout(true);
    } else {
      return toast.info("Não encontramos nenhum ingresso no seu carrinho");
    }
    setIsLoadingCartItem(false);
  };

  const handleDeleteItem = async (idInShoppingCart) => {

    const accessToken = window.localStorage.getItem("accessToken");
    setIsLoadingCartItem(true);
    const result = await shoppingCartService.deleteShoppingCartItem({ idInShoppingCart, accessToken });
    var data = result?.data;
    if (data?.success) {
      getCartItems();
      // setCartItems(data);
      // setShowCheckout(true);
    } else {
      return toast.info("Não encontramos nenhum ingresso no seu carrinho");
    }
    setIsLoadingCartItem(false);
  };

  return (
    <>
      <Head>
        <title>{`Eventozz | ${event?.nome_evento ? event?.nome_evento : ''}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={event?.descricao_seo ? event?.descricao_seo : 'Acesse o link para ver mais detalhes sobre o evento e garantir a sua participação!'} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Eventozz | ${event?.nome_evento ? event?.nome_evento : ''}`} />
        <meta property="og:description" content={event?.descricao_seo ? event?.descricao_seo : 'Acesse o link para ver mais detalhes sobre o evento e garantir a sua participação!'} />
        <meta property="og:image" itemprop="image" content={event?.imagem_banner ? event.imagem_banner : 'https://eventozz-dev.herokuapp.com/images/banner/banner-img1.png'} />
      </Head>

      <div className='app-container'>
        <div className='trade-cryptocurrency-area'
          style={{ background: event?.cor_principal ? (event?.cor_principal) : ('#00a79d') }}
        >{event?.imagem_banner ? (
          <div className='col-12 d-flex justify-content-center'>
            <div className='dimension-automatic'>
              <img
                className="img-eventozz-buy-page-banner"
                src={event?.imagem_banner}
                alt='image'
              />
            </div>
            {/* {showTicketSale && <div onClick={() => scrollToElement({ id: 'tickets-sale-area' })} className="absolute btn-compre-agora bannerinicial justify-content-center justify-content-md-start pt-4 row"><a className="default-btn">{event?.is_free ? 'Reservar ingresso' : 'Comprar agora'}<i className="btn-comprar-agora bx bx-money"></i></a></div>} */}
          </div>
        ) : (
          <>
            <div className='main-banner-area-landing'>
              <div className='container'>
                <div className='align-items-center m-0 position-relative row'>
                  <div className='col-md-6 p-0 col-left-initial-banner'>
                    <div className='main-banner-content-landing'>
                      <h1 className='text-center text-md-start'>{event.nome_evento}</h1>
                      {/* {showTicketSale && <div onClick={() => scrollToElement({ id: 'tickets-sale-area' })} className="absolute btn-compre-agora justify-content-center justify-content-md-start pt-4 row"><a className="default-btn">{event?.is_free ? 'Reservar ingresso' : 'Comprar agora'}<i className="btn-comprar-agora bx bx-money"></i></a></div>} */}
                    </div>
                  </div>
                  <div className='col-md-6 p-0 col-right-initial-banner'>
                    <div className='main-banner-image-landing'>
                      <Image src={BannerImg1} alt='Banner inicial' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='shape1 shape'>
                <Image src={Shape1} alt='image' />
              </div>
              <div className='shape2 shape'>
                <Image src={Shape2} alt='image' />
              </div>
              <div className='shape3 shape'>
                <Image src={Shape3} alt='image' />
              </div>
              <div className='shape5 shape'>
                <Image src={Shape5} alt='image' />
              </div>
              <div className='shape9 shape'>
                <Image src={Shape9} alt='image' />
              </div>

            </div>
          </>
        )}

        </div>

        {showTicketSale && !hideOnCheckout && (
          <>
            <TokensArea item={event} endTime={eventDay} showTicketSale={showTicketSale} />
          </>
        )}

        <Row>
          <Col xs={12}>
            <EventDetails item={event} showTicketSale={showTicketSale} />
          </Col>
        </Row>

        {showTicketSale && !hideOnCheckout && (
          <>
            <Banner item={event} handleCheckout={getCartItems} syncCartItems={cartItems} />
          </>
        )}


        {
          showEventSoon && (
            <div className="event-finish pt-100">
              <span
                style={{ color: event?.cor_secundaria ? (event?.cor_secundaria) : ('#00a79d') }}
              >EVENTO EM BREVE</span>
            </div>
          )
        }
        {
          showClosedSales && (
            <div className="event-finish pt-100">
              <span
                style={{ color: event?.cor_secundaria ? (event?.cor_secundaria) : ('#00a79d') }}
              >VENDAS ENCERRADAS</span>
            </div>
          )
        }
        <PaymentArea />
        {
          showCheckout && <Checkout dados={event} cartItems={cartItems} handleChangeTicketQuantity={handleChangeTicketQuantity}
            handleDeleteItem={handleDeleteItem} isLoadingCartItem={isLoadingCartItem} handleAddCupom={getCartItems} hideOnCheckout={hideOnCheckout}
            setHideOnCheckout={setHideOnCheckout} seller={seller} />
        }
      </div>
    </>
  );
};

export default Event;

export async function getServerSideProps(context) {
  const { params } = context;
  const { eventSlug: slug } = params;
  const result = await servicesEventozz.getEvent(slug);

  let event = [];
  let showTicketSale = false;
  let isActive = false;
  let showEventSoon = false;
  let showClosedSales = false;
  let eventDate = '';

  if (result?.status === 200 && result?.data?.success && result?.data?.data?.length > 0) {
    event = result?.data?.data[0];
    let today = new Date();
    let ticketSaleStartDate = new Date(event?.data_inicio_venda_ingresso);
    let ticketSaleEndDate = new Date(event?.data_fim_venda_ingresso);
    let eventSoonDate = new Date(event?.data_inicio_em_breve);

    isActive = Number(event?.active) === 1 ? true : false;
    eventDate = event?.data_inicio;

    if (today >= ticketSaleStartDate && today <= ticketSaleEndDate) {
      showTicketSale = true;
    }

    if (today >= eventSoonDate && today < ticketSaleStartDate) {
      showEventSoon = true;
    }

    if (today > ticketSaleEndDate) {
      showClosedSales = true;
    }

  }

  return {
    props: {
      event,
      isActive,
      showTicketSale,
      showEventSoon,
      eventDate,
      showClosedSales
    },
  }
}