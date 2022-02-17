import Link from 'next/link';
import Image from 'next/image';

import LogoEventozz from '../../public/images/logo-eventozz.png'

const Footer = () => {
  return (
    <>
      <footer className='footer-area'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-4 col-sm-6 col-md-6'>
              <div className='single-footer-widget'>
                <a href='index.html' className='d-inline-block logo'>
                  <Image src={LogoEventozz} alt='logo' />
                </a>
                <div className='newsletter-form'>

                </div>

              </div>
            </div>
            <div className='col-lg-2 col-sm-6 col-md-6'>
              <div className='single-footer-widget'>
                <h3>Serviços</h3>
                <ul className='services-links'>
                  <li>
                    <Link href='https://wa.me//5594993040161?text=Quero%20organizar%20um%20evento'>Organizar Eventos</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-3 col-sm-6 col-md-6'>
              <div className='single-footer-widget pl-5'>
                <h3>Links</h3>
                <ul className='quick-links'>
                  <li>
                    <Link href='/'>Home</Link>
                  </li>
                  <li>
                    <Link href='/eventos'>Eventos</Link>
                  </li>
                  {/* <li>
                    <Link href='/wallet'>Noticias</Link>
                  </li> */}
                  <li>
                    <Link href='/sobre-nos'>Sobre Nós</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-3 col-sm-6 col-md-6'>
              <div className='single-footer-widget'>
                <h3>Contato</h3>
                <ul className='footer-contact-info'>
                  <li>Endereço: Rua Araguia - 705 C, Novo Horizonte. Marabá - PA</li>
                  <li>
                    E-mail: <a href='mailto:contato@eventozz.com'>contato@eventozz.com</a>
                  </li>
                  <li>
                    Whatsapp: <a href='https://wa.me/5594993040161'>(94) 9 9304-0161</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='copyright-area'>
          <div className='container'>
            <p>
              Copyright 2021. Desenvolvido por{' '}
              <Link href='https://portalctech.com.br/' target='_blank'>
                CTECH
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
