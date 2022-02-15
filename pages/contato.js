import PageBanner from '../components/Common/PageBanner';

const Contact = () => {
  return (
    <>
      <PageBanner
        pageTitle='Contato'
        pageSubTitle='Qualquer duvida é só chamar a gente'
      />

      <div className='contact-area ptb-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-4 col-lg-12 col-md-12'>
              <div className='contact-info'>
                <h3>Endereço de Contatos</h3>
                <ul className='contact-list'>
                  <li>
                    <div className='icon'>
                      <i className='bx bx-support'></i>
                    </div>
                    <p>
                      <a href='https://api.whatsapp.com/send/?phone=5594993040161&text&app_absent=0'>(94) 9 9304-0161</a>
                    </p>
                  </li>
                  <li>
                    <div className='icon'>
                      <i className='bx bx-globe'></i>
                    </div>
                    <p>
                      <a href='mailto:contato@eventozz.com'> contato@eventozz.com</a>
                    </p>
                  </li>
                  <li>
                    <div className='icon'>
                      <i className='bx bx-map'></i>
                    </div>
                    <p>Rua Araguia - 705 C, Novo Horizonte. Marabá - PA</p>
                  </li>
                </ul>
                <ul className='social-links'>
                  <li>
                    <a href='https://www.instagram.com/eventozz_/' target='_blank' className='instagram'>
                      <i className='bx bxl-instagram'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-xl-8 col-lg-12 col-md-12'>
              <div className='maps'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.32055368847!2d-49.1226922856614!3d-5.367984196106337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c3a17f6748efbd%3A0xbc0ca4faf3abcb53!2sC-TECH%20-%20Desenvolvendo%20Solu%C3%A7%C3%B5es!5e0!3m2!1spt-BR!2sbr!4v1644963659340!5m2!1spt-BR!2sbr" loading="lazy"></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
