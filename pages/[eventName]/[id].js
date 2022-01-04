import React, { useState, useEffect } from 'react';
import Banner from '../../components/Common/Banner';
import Features from '../../components/Trade/Features';
import PaymentArea from '../../components/Trade/PaymentArea';
import RegisterArea from '../../components/Common/RegisterArea';
import { useRouter } from 'next/router'
import servicesEventozz from '../../services/events';
import TokensArea from '../../components/HomeThree/TokensArea';
import EventDetails from '../../components/Common/EventDetails';


const Event = ({event, isActive, showEventSoon, showTicketSale, showClosedSales, eventDate}) => {
  console.log(event);
  console.log(isActive);
  const router = useRouter();
  // const { id } = router.query
  // const [isEvent, setIsEvent] = useState(false);
  // const [item, setItem] = useState([]);
  // const [isActive, setIsActive] = useState(true);
  const [eventDay, setEventDay] = useState('');

  useEffect(() => {
    if (eventDate != '') {
      console.log(eventDate);
      const eventDayAux = new Date(eventDate);
      setEventDay(eventDayAux)
    }
  }, [eventDate]);

  // async function getDetails(id) {
  //   const result = await ServicesEventozz.getEvent(id);
  //   if (result.status == 200) {
  //     setIsEvent(true);
  //     var data = result?.data?.data[0];
  //     setItem(data);
  //     console.log("+++++++++++++++++++");
  //     console.log(data);
  //     var today = new Date();
  //     var eventDayAux = new Date(data?.data_inicio);
  //     setEventDay(eventDayAux)
  //     console.log(today)
  //     console.log(eventDayAux)
  //     if (today > eventDayAux) {
  //       setIsActive(false)
  //     } else {
  //       setIsActive(true)
  //     }

  //   } else {
  //     setIsEvent(false);
  //   }
  // }


  return (
    <>
      <div className='trade-cryptocurrency-area'
        style={{ background: event?.cor_principal ? (event?.cor_principal) : ('#00a79d') }}
      >{event?.imagem_banner ? (
        <div className='col-12'>
          <img
            className="img-eventozz-buy-page-banner"
            src={event?.imagem_banner}
            alt='image'
          />

        </div>
      ) : (
        <>
          <div className='main-banner-area-landing'>
            <div className='container'>
              <div className='row align-items-center m-0'>
                <div className='col-xl-5 col-lg-5 col-md-12 p-0'>
                  <div className='main-banner-content-landing'>
                    <h1>Participe dos melhores eventos de forma rapida e segura!</h1>
                  </div>
                </div>
                <div className='col-xl-4 col-lg-12 col-md-12 p-0'>
                  <div className='main-banner-image-landing'>
                    <img src='/images/banner/banner-img1.png' alt='image' />
                  </div>
                </div>
              </div>
            </div>
            <div className='shape1'>
              <img src='/images/shape/shape1.png' alt='image' />
            </div>
            <div className='shape2'>
              <img src='/images/shape/shape2.png' alt='image' />
            </div>
            <div className='shape3'>
              <img src='/images/shape/shape3.png' alt='image' />
            </div>
            <div className='shape5'>
              <img src='/images/shape/shape5.png' alt='image' />
            </div>
            <div className='shape9'>
              <img src='/images/shape/shape9.png' alt='image' />
            </div>

          </div>
        </>
      )}

      </div>
      <Features item={event} showTicketSale={showTicketSale} />
      <EventDetails item={event} showTicketSale={showTicketSale} />
      {showTicketSale && (
          <>
            <TokensArea item={event} endTime={eventDay} showTicketSale={showTicketSale} />
            <Banner item={event} />
          </>
        )
      }
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
      <RegisterArea ctaImage='/images/man.png' item={event} />
    </>
  );
};

export default Event;

export async function getServerSideProps(context) {
  console.log(context);
  const {params} = context;
  const {id} = params;
  const result = await servicesEventozz.getEvent(id);
  
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