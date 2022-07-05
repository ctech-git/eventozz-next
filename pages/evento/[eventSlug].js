import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import PaymentArea from '../../components/Trade/PaymentArea';
import servicesEventozz from '../../services/events';
import { MetaTagsEvent } from '../../components/MetaTagsEvent';
import { scrollToElement } from '../../utils/scrollTo';
import Checkout from '../../components/Checkout';
import shoppingCartService from '../../services/cart';
import { SeatPreview } from '../../components/seatPreview';

//Imagens
import { Counter } from '../../components/Counter';
import { AvailableTicketsContainer } from '../../components/AvailableTicketsContainer';
import { EventDetails } from '../../components/EventDetails';
import { EventWarning } from '../../components/EventWarning';
import { BannerEvent } from '../../components/BannerEvento';
import { useCart } from '../../context/cart';

export const Event = ({ event, isActive, showEventSoon, showTicketSale, showClosedSales, eventDate, ticketsSold }) => {

  console.log(ticketsSold);
  const { query } = useRouter();
  const seller = query?.vendedor;
  const [eventDay, setEventDay] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isLoadingCartItem, setIsLoadingCartItem] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [hideOnCheckout, setHideOnCheckout] = useState(false);

  const { cartId } = useCart();

  useEffect(() => {
    if (eventDate != '') {
      const eventDayAux = new Date(eventDate);
      eventDayAux.setHours(eventDayAux.getHours() + 3)
      setEventDay(eventDayAux)
    }
  }, [eventDate]);

  const getCartItems = async ({cartIdTemp=false}) => {
    try {
      setIsLoadingCartItem(true);
      const result = await shoppingCartService.listShoppingCart({eventId: event.id, cartId: cartIdTemp ? cartIdTemp : cartId});
      var data = result?.data?.data;
      if (data?.length > 0) {
        setCartItems(data);
        setShowCheckout(true);
        scrollToElement({ id: 'container-checkout' });
      } else {
        setCartItems([])
        setShowCheckout(false);
        scrollToElement({ id: 'tickets-sale-area' });
        return toast.info("Não encontramos nenhum ingresso no seu carrinho");
      }
      setIsLoadingCartItem(false);
      
    } catch (error) {
      console.log('error getCartItems -> ', error);
    }
  };

  const handleChangeTicketQuantity = async ({ idInShoppingCart, quantity, cartItem }) => {
    if (quantity > cartItem.qtdDisponivel) {
      return toast.info("A quantidade informada não está mais disponível");
    }

    if (quantity < 0) {
      return;
    }
    setIsLoadingCartItem(true);
    const result = await shoppingCartService.updateQuantityShoppingCart({ idInShoppingCart, quantity });
    var data = result?.data;
    if (data?.success) {
      getCartItems({cartIdTemp:false});
    } else {
      return toast.info("Não encontramos nenhum ingresso no seu carrinho");
    }
    setIsLoadingCartItem(false);
  };

  const handleDeleteItem = async (idInShoppingCart) => {

    setIsLoadingCartItem(true);
    const result = await shoppingCartService.deleteShoppingCartItem({ idInShoppingCart });
    var data = result?.data;
    if (data?.success) {
      getCartItems({cartIdTemp:false});
    } else {
      return toast.info("Não encontramos nenhum ingresso no seu carrinho");
    }
    setIsLoadingCartItem(false);
  };

  return (
    <>
      <MetaTagsEvent event={event} />
      <div className='app-container'>

        <BannerEvent event={event} />

        {event?.seat_preview ? (
          <>
            <SeatPreview ticketsSold={ticketsSold} />
          </>
        ) : null}

        {event?.isContador ? (
          <>
            <Counter item={event} endTime={eventDay} showTicketSale={showTicketSale} />
          </>
        ) : null}

        <Row className='responsive-container'>

          <EventDetails item={event} showTicketSale={showTicketSale} />

          {showTicketSale && isActive && !hideOnCheckout && (
            <AvailableTicketsContainer item={event} handleCheckout={getCartItems} syncCartItems={cartItems} />
          )}
        </Row>

        {
          showEventSoon ? (
            <EventWarning color={event?.cor_secundaria ? event?.cor_secundaria : '#00a79d'} text="EVENTO EM BREVE" />
          ) : null
        }
        {
          showClosedSales ? (
            <EventWarning color={event?.cor_secundaria ? event?.cor_secundaria : '#00a79d'} text="VENDAS ENCERRADAS" />
          ) : null
        }
        {
          !isActive ? (
            <EventWarning color={event?.cor_secundaria ? event?.cor_secundaria : '#00a79d'} text="O EVENTO ESTÁ FECHADO" />
          ) : null
        }
        <PaymentArea />
        {
          showCheckout ? (
            <Checkout dados={event} cartItems={cartItems} handleChangeTicketQuantity={handleChangeTicketQuantity}
              handleDeleteItem={handleDeleteItem} isLoadingCartItem={isLoadingCartItem} handleAddCupom={getCartItems} hideOnCheckout={hideOnCheckout}
              setHideOnCheckout={setHideOnCheckout} seller={seller} />
          ) : null
        }
      </div>
    </>
  );
};

export default Event;

export async function getServerSideProps(context) {
  const { params } = context;
  const { eventSlug: slug } = params;
  const { getEvent, getTicketsSoldNumber } = servicesEventozz;
  const result = await getEvent(slug);

  let event = [];
  let showTicketSale = false;
  let isActive = false;
  let showEventSoon = false;
  let showClosedSales = false;
  let eventDate = '';
  let ticketsSold = false;

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

  const resultTicketsSold = await getTicketsSoldNumber({ eventId: event?.id });
  if (resultTicketsSold?.data?.success) {
    ticketsSold = resultTicketsSold?.data?.data
  }

  return {
    props: {
      event,
      isActive,
      showTicketSale,
      showEventSoon,
      eventDate,
      showClosedSales,
      ticketsSold
    },
  }
}