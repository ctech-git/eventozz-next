import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
  items: 1,
  nav: true,
  loop: true,
  margin: 30,
  dots: true,
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    "<i class='bx bx-left-arrow-alt'></i>",
    "<i class='bx bx-right-arrow-alt'></i>",
  ],
};

const Portfolio = ({ bgColor, contentColor = '', shape }) => {
  const [display, setDisplay] = useState(false);
  const [isMounted, setisMounted] = useState(false);
  const [showShape, setshowShape] = useState(shape);

  useEffect(() => {
    setisMounted(true);
    setDisplay(true);
    setisMounted(false);
  }, []);

  return (
    <>
      <div className={`portfolio-area ${bgColor}`}>
        <div className='container'>
          <div className={`single-portfolio-item ${contentColor}`}>
            <div className='row align-items-center m-0'>
              <div className='col-xl-5 col-lg-6 col-md-12 p-0'>
                <div className='content-slides'>
                  {display ? (
                    <OwlCarousel {...options}>
                      <div className='content'>
                        <h3>Acompanhe seus indicadores</h3>
                        <p>
                          Compras realizadas, pendentes e não concluídas.
                          Além dos dados de seus participantes à disposição.
                        </p>
                      </div>
                      <div className='content'>
                        <h3>Acompanhe os dados do evento em tempo real</h3>
                        <p>
                          Quantas pessoas já entraram, quantas ainda faltam, o valor recebido de cada pessoa.
                          Tudo para que você tenha tudo do seu evento na palma da mão.

                        </p>
                      </div>
                      <div className='content'>
                        <h3>Faça remarketing.</h3>
                        <p>
                          Nossa API irá enviar mensagens para seu cliente lembrando dos pagamentos para garantir ao máximo cada compra.

                        </p>
                      </div>
                    </OwlCarousel>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className='col-xl-7 col-lg-6 col-md-12 p-0'>
                <div className='image text-center'>
                  <img src='/images/portfolio/portfolio-img1.png' alt='image' />
                </div>
              </div>
            </div>
          </div>
        </div>
        {shape && (
          <div className='shape11'>
            <img src='/images/shape/shape11.png' alt='image' />
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
