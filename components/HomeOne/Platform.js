import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
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
  const Eventozz = [
    {
      id: 1,
      nome: "Evento Teste 1",
      foto: "/images/cryptocurrency-platform/cryptocurrency-platform-1.jpg",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    },
    {
      id: 2,
      nome: "Evento Teste 3",
      foto: "/images/cryptocurrency-platform/cryptocurrency-platform-2.jpg",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    },
    {
      id: 3,
      nome: "Evento Teste 2",
      foto: "/images/cryptocurrency-platform/cryptocurrency-platform-3.jpg",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    },
    {
      id: 4,
      nome: "Evento Teste 4",
      foto: "/images/cryptocurrency-platform/cryptocurrency-platform-3.jpg",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    },
    {
      id: 5,
      nome: "Evento Teste 5",
      foto: "/images/cryptocurrency-platform/cryptocurrency-platform-3.jpg",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    },
    {
      id: 6,
      nome: "Evento Teste 6",
      foto: "https://eventozz.com/assets/img/rufino.jpeg",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
    },
  ];

  useEffect(() => {
    setisMounted(true);
    setDisplay(true);
    setisMounted(false);
  }, []);

  return (
    <>
      {display && (
        <div className='cryptocurrency-platform-area'>
          <div className='container-fluid'>
            <div className='section-title'>
              <h2>Eventozz para você participar</h2>
            </div>
            <div className='cryptocurrency-platform-slides'>

              <OwlCarousel {...options}>

                {Eventozz.map((item, index) => {
                  if (index <= 10) {
                    return (
                      <div className='single-cryptocurrency-platform-box'>
                        <img
                          className="img-eventozz"
                          src={item.foto}
                          alt='image'
                        />
                        <div className='content'>
                          <div className='icon'>
                            <img src='/images/icon/icon6.png' alt='image' />
                          </div>
                          <h3>
                            <a href='cryptocurrency-details.html'>
                              {item.nome}
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

              </OwlCarousel>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Platform;
