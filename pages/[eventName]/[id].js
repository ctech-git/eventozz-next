import React, { useState, useEffect } from 'react';
import Banner from '../../components/Common/Banner';
import Features from '../../components/Trade/Features';
import BestSeller from '../../components/Common/BestSeller';
import PaymentArea from '../../components/Trade/PaymentArea';
import FeedBack from '../../components/Common/FeedBack';
import RegisterArea from '../../components/Common/RegisterArea';
import { useRouter } from 'next/router'
import ServicesEventozz from '../../services/events';
import TokensArea from '../../components/HomeThree/TokensArea';


const Buy = () => {
  const router = useRouter();
  const { id } = router.query
  const [isEvent, setIsEvent] = useState(false);
  const [item, setItem] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [eventDay, setEventDay] = useState('');

  useEffect(() => {
    if (id != undefined) {
      console.log(id)
      getDetails(id);
    }
  }, [id]);

  async function getDetails(id) {
    const result = await ServicesEventozz.getEventosEspecific(id);
    if (result.status == 200) {
      setIsEvent(true);
      var data = result?.data?.data[0];
      setItem(data);
      console.log("+++++++++++++++++++");
      console.log(data);
      var today = new Date();
      var eventDayAux = new Date(data?.data_inicio);
      setEventDay(eventDayAux)
      console.log(today)
      console.log(eventDayAux)
      if (today > eventDayAux) {
        setIsActive(false)
      } else {
        setIsActive(true)
      }

    } else {
      setIsEvent(false);
    }
  }


  return (
    <>
      <div className='trade-cryptocurrency-area'
        style={{ background: item?.cor_principal ? (item?.cor_principal) : ('#00a79d') }}
      >{item.imagem_banner ? (
        <div className='col-12'>
          <img
            className="img-eventozz-buy-page-banner"
            src={item.imagem_banner}
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
      <Features item={item} />
      {isActive ? (
        <>
          <TokensArea item={item} endTime={eventDay} />
          <Banner item={item} />
        </>
      ) : (
        <div className="event-finish">
          <span
            style={{ color: item?.cor_secundaria ? (item?.cor_secundaria) : ('#00a79d') }}
          >VENDAS ENCERRADAS</span>
        </div>
      )}

      {/* <BestSeller /> */}
      <PaymentArea />
      {/* <FeedBack /> */}
      <RegisterArea ctaImage='/images/man.png' item={item} />
    </>
  );
};

export default Buy;
