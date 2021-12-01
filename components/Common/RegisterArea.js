import Link from 'next/link';

const RegisterArea = ({ bgGradient, blackText, ctaImage, item = {} }) => {
  return (
    <>
      <div className='cta-area pt-100'
        style={{ backgroundColor: item?.cor_principal && (item?.cor_principal) }}
      >
        <div className='container'>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-6 col-md-12'>
              <div className={`cta-content ${blackText}`}>
                <h2>Mantenha os seus dados atualizados</h2>
                <p>
                  Dessa forma podemos garantir a melhor experiencia possivel, desde a organização de todo o seu historico até sugestões de eventos no seu perfil em regiões proximas a você.
                </p>
                <Link href='/buy'>
                  <a className='default-btn global-cursor'
                    style={{ backgroundColor: item?.cor_secundaria && (item?.cor_secundaria) }}
                  >
                    <i className='bx bxs-user'></i> Eventos
                  </a>
                </Link>
              </div>
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='cta-image'>
                <img src={ctaImage} alt='image' />
              </div>
            </div>
          </div>
        </div>
        <div className='shape6'>
          <img src='/images/shape/shape6.png' alt='image' />
        </div>
        <div className='shape7'>
          <img src='/images/shape/shape7.png' alt='image' />
        </div>
        <div className='shape8'>
          <img src='/images/shape/shape8.png' alt='image' />
        </div>
        <div className='shape9'>
          <img src='/images/shape/shape9.png' alt='image' />
        </div>
        <div className='shape15'>
          <img src='/images/shape/shape15.png' alt='image' />
        </div>
      </div>
    </>
  );
};

export default RegisterArea;
