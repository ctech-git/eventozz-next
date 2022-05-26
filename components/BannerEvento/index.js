import Image from "next/image";
import { Col } from "react-bootstrap"

import BannerImg1 from '../../public/images/banner/banner-img1.webp';
import Shape1 from '../../public/images/shape/shape1.png';
import Shape2 from '../../public/images/shape/shape2.png';
import Shape3 from '../../public/images/shape/shape3.png';
import Shape5 from '../../public/images/shape/shape5.png';
import Shape9 from '../../public/images/shape/shape9.png';

export const BannerEvent = ({ event }) => {
    return (
        <div className='trade-cryptocurrency-area' style={{ background: event?.cor_principal ? (event?.cor_principal) : ('#00a79d') }}>
            {event?.imagem_banner ? (
                <Col xs={12} className='justify-content-center'>
                    <div className='dimension-automatic'>
                        <img
                            className="img-eventozz-buy-page-banner"
                            src={event?.imagem_banner}
                            alt='image'
                        />
                    </div>
                </Col>
            ) : (
                <>
                    <div className='main-banner-area-landing'>
                        <div className='container'>
                            <div className='align-items-center m-0 position-relative row'>
                                <Col xs={12} md={6} className='p-0 col-left-initial-banner'>
                                    <div className='main-banner-content-landing'>
                                        <h1 className='text-center text-md-start'>{event.nome_evento}</h1>
                                        {/* {showTicketSale && <div onClick={() => scrollToElement({ id: 'tickets-sale-area' })} className="absolute btn-compre-agora justify-content-center justify-content-md-start pt-4 row"><a className="default-btn">{event?.is_free ? 'Reservar ingresso' : 'Comprar agora'}<i className="btn-comprar-agora bx bx-money"></i></a></div>} */}
                                    </div>
                                </Col>
                                <Col xs={12} md={6} className='p-0 col-right-initial-banner'>
                                    <div className='main-banner-image-landing'>
                                        <Image src={BannerImg1} alt='Banner inicial' />
                                    </div>
                                </Col>
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
    )
}