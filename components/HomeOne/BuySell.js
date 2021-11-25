import React from 'react';

const BuySell = ({ pt70 }) => {
  return (
    <>
      <div className={`buy-sell-cryptocurrency-area bg-image ${pt70}`}>
        <div className='container'>
          <div className='section-title'>
            <h2>Como comprar de forma rapida e facil</h2>
            <p>
              Se liga só nas soluções que temos para facilitar a sua vida
            </p>
          </div>
          <div className='row justify-content-center'>
            <div className='col-xl-6 col-lg-12 col-md-12'>
              <div className='buy-sell-cryptocurrency-image'>
                <img src='/images/women-with-tab.png' alt='image' />
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12'>
              <div className='buy-sell-cryptocurrency-content'>
                <div className='row justify-content-center'>
                  <div className='col-lg-6 col-sm-6 col-md-6'>
                    <div className='single-buy-sell-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon12.png' alt='image' />
                      </div>
                      <h3>Pagamento Facilitado</h3>
                      <p>
                        Aceitamos não apenas cartão de credito, mas também pagamentos via PIX.
                      </p>
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-6 col-md-6'>
                    <div className='single-buy-sell-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon13.png' alt='image' />
                      </div>
                      <h3>Carteira? Nem precisa</h3>
                      <p>
                        Leve seu Qr Code no próprio celular e apresente na hora. Lembre-se: cada QR Code é único, assim como você
                      </p>
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-6 col-md-6'>
                    <div className='single-buy-sell-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon14.png' alt='image' />
                      </div>
                      <h3>Cash Back</h3>
                      <p>
                        A cada compra você acumula pontos em nossa plataforma que podem virar descontos;
                      </p>
                    </div>
                  </div>
                  {/* <div className='col-lg-6 col-sm-6 col-md-6'>
                    <div className='single-buy-sell-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon15.png' alt='image' />
                      </div>
                      <h3>Debit/Credit Cards</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut.
                      </p>
                    </div>
                  </div> */}
                  {/* <div className='col-lg-6 col-sm-6 col-md-6'>
                    <div className='single-buy-sell-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon16.png' alt='image' />
                      </div>
                      <h3>Discounted Gift Cards</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut.
                      </p>
                    </div>
                  </div> */}
                  <div className='col-lg-6 col-sm-6 col-md-6'>
                    <div className='single-buy-sell-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon17.png' alt='image' />
                      </div>
                      <h3>Presentei Alguém</h3>
                      <p>
                        Ao comprar para outras pessoas, elas receberam um e-mail com o QR-code e todas as informações.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySell;
