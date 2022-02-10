import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { scrollToElement } from '../../utils/scrollTo';

const TokensArea = ({ item, endTime, showTicketSale }) => {
  const [action, setAction] = useState({});
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const comingSoonTime = () => {
    let endTimeParse = Date.parse(endTime) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let countdays = Math.floor(timeLeft / 86400);
    countdays = countdays >= 0 ? countdays : 0;
    let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
    counthours = counthours >= 0 ? counthours : 0;
    let countminutes = Math.floor((timeLeft - countdays * 86400 - counthours * 3600) / 60);
    countminutes = countminutes >= 0 ? countminutes : 0;
    let countseconds = Math.floor(timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60);
    countseconds = countseconds >= 0 ? countseconds : 0;
    if (counthours < 10) {
      counthours = 0 + counthours;
    }
    if (countminutes < 10) {
      countminutes = 0 + countminutes;
    }
    if (countseconds < 10) {
      countseconds = 0 + countseconds;
    }

    setDays(countdays);
    setHours(counthours);
    setMinutes(countminutes);
    setSeconds(countseconds);
  };

  useEffect(() => {

    setInterval(() => {
      if (endTime != "") {
        comingSoonTime();
      }
    }, 1000);

    return () => {
      setAction({});
    };
  }, [endTime]);
  return (
    <>
      <div className='tokens-area pt-100 pb-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-lg-6 col-md-12'>
              {/* <div className='tokens-image'>
                <img src={item.foto} alt='image' />
              </div> */}
            </div>
            <div className='tokens-content text-center pb-100'>
              <h2>{item.texto_contador}</h2>
              <h6>{item.descricao_contador}</h6>
              <div id='countdown'>
                <ul>
                  <li>
                    <span id='days'>{days}</span>DIAS
                  </li>
                  <li>
                    <span id='hours'>{hours}</span>HORAS
                  </li>
                  <li>
                    <span id='minutes'>{minutes}</span>MIN
                  </li>
                  <li>
                    <span id='seconds'>{seconds}</span>SEG
                  </li>
                </ul>
              </div>

            </div>

          </div>
          {/* {showTicketSale && <div onClick={() => scrollToElement({ id: 'tickets-sale-area' })} className="justify-content-center pt-50 row btn-compre-agora absolute"><a className="default-btn"><i className="bx bxs-chat"></i>{item?.is_free ? 'Reservar ingresso' : 'Comprar agora'}</a></div>} */}
        </div>
      </div>
    </>
  );
};

export default TokensArea;
