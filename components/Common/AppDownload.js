
const AppDownload = () => {
  return (
    <>
      <div className='app-download-area mt-5'>
        <div className='container'>
          <div className='row align-items-center m-0'>
            <div className='col-lg-6 col-md-12 p-0'>
              <div className='app-download-image'>
                <img src='/images/app2.png' alt='image' />
              </div>
            </div>
            <div className='col-lg-6 col-md-12 p-0'>
              <div className='app-download-content'>
                <h2>Praticidade na palma de suas mãos</h2>
                <p>
                  Compre os seus ingressos de forma rapida e desfrute dos melhores eventos da região.
                  Você irá receber o QR Code em seu email e em seu Whatsapp em até 72h úteis após a confirmação do pagamento

                </p>
                {/* <div className='btn-box'>
                  <a href='#' className='playstore-btn' target='_blank'>
                    <img src='/images/play-store.png' alt='image' />
                    Get It On
                    <span>Google Play</span>
                  </a>
                  <a href='#' className='applestore-btn' target='_blank'>
                    <img src='/images/apple-store.png' alt='image' />
                    Download on the
                    <span>Apple Store</span>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDownload;
