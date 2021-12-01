import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const TokensArea = ({ item, endTime }) => {
  const [action, setAction] = useState({});
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const comingSoonTime = () => {
    var endTimeParse = Date.parse(endTime) / 1000;
    var now = new Date();
    var nowParse = Date.parse(now) / 1000;
    var timeLeft = endTimeParse - nowParse;
    var countdays = Math.floor(timeLeft / 86400);
    var counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
    var countminutes = Math.floor((timeLeft - countdays * 86400 - counthours * 3600) / 60);
    var countseconds = Math.floor(timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60);
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
      <div className='tokens-area pb-100'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-lg-6 col-md-12'>
              <div className='tokens-image'>
                <img src={item.foto} alt='image' />
              </div>
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='tokens-content'>
                <h2>{item.texto_contador}</h2>
                <span>{item.descricao_contador}</span>
                <div id='countdown'>
                  <ul>
                    <li>
                      <span id='days'>{days}</span>DAYS
                    </li>
                    <li>
                      <span id='hours'>{hours}</span>HOURS
                    </li>
                    <li>
                      <span id='minutes'>{minutes}</span>MIN
                    </li>
                    <li>
                      <span id='seconds'>{seconds}</span>SEC
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokensArea;
