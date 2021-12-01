import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ServicesEventozz from '../../services/events';
import { Container, Row, Col } from 'react-bootstrap';
import { dateLastAccess } from '../../utils/strings';

const OwlCarousel = dynamic(import('react-owl-carousel3'));
const options = {
  nav: true,
  loop: true,
  margin: 30,
  dots: true,
  center: true,
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    "<i class='bx bx-left-arrow-alt'></i>",
    "<i class='bx bx-right-arrow-alt'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 1,
    },
    768: {
      items: 2,
      center: false,
    },
    992: {
      items: 2,
      center: false,
    },
    1200: {
      items: 2,
      center: true,
    },
  },
};

const Platform = () => {
  const [display, setDisplay] = useState(false);
  const [isMounted, setisMounted] = useState(false);
  const [Eventozz, setEventozz] = useState([]);

  useEffect(() => {
    //const token = window.localStorage.getItem("AcessToken");
    setisMounted(true);
    setDisplay(true);
    setisMounted(false);
    getEventos();
  }, []);

  async function getEventos() {

    const result = await ServicesEventozz.getEventos();
    if (result.status == 200) {
      setEventozz(result?.data?.data)
    }
    console.log("===============")
    console.log(result)
  }
  async function goToEvents(nome, id) {
    console.log(id)
    let link = nome.replaceAll(" ", "-");
    window.location.href = `/${link}/${id}`;
  }

  return (
    <>
      {display && (
        <div className='cryptocurrency-platform-area'>
          <div className='container-fluid'>
            <div className='section-title'>
              <h2>Eventozz para você participar</h2>
            </div>
            <Row className="box-events">
              {Eventozz.map((item, index) => {
                return (
                  <div className="card-events-home" onClick={() => goToEvents(item.nome_evento, item.id)}>
                    <img
                      className="img-eventozz"
                      src={item.foto}
                      alt='image'
                    />
                    <div>
                      <label>{dateLastAccess(item.data_inicio)}</label>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M15.494 12.6a.85.85 0 01-.253.51l-5.246 5.14a.89.89 0 01-.847.22.868.868 0 01-.619-.61.847.847 0 01.23-.828l4.624-4.532L8.76 7.968a.847.847 0 01-.23-.829.868.868 0 01.619-.61.89.89 0 01.847.221l5.246 5.14a.847.847 0 01.253.71z">
                        </path>
                      </svg>
                      <label>{dateLastAccess(item.data_fim)}</label>
                    </div>
                    <span>{item.nome_evento}</span>
                    <span className="legend-events">{item.local_evento}</span>

                  </div>
                )
              })}
              {/* 
              <OwlCarousel {...options}>

                {Eventozz.map((item, index) => {
                  if (index <= 10) {
                    return (
                      <div className='single-cryptocurrency-platform-box'>
                        <img
                          className="img-eventozz"
                          src={"https://eventozz.com/" + item.foto}
                          alt='image'
                        />
                        <div className='content'>
                          <div className='icon'>
                            <img src='/images/icon/icon6.png' alt='image' />
                          </div>
                          <h3>
                            <a href='cryptocurrency-details.html'>
                              {item.nome_evento}
                            </a>
                          </h3>
                          <p>
                            {item.descricao}
                          </p>
                        </div>
                      </div>

                    )

                  }
                })}

              </OwlCarousel> */}

            </Row>

          </div>
        </div>
      )}
    </>
  );
};

export default Platform;
