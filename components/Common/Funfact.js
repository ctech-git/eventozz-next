import React from 'react';

const Funfact = ({ pt100 }) => {
  return (
    <>
      <div className={`funfacts-area ${pt100}`}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
              <div className='single-funfacts-box'>
                <div className='icon'>
                  <img src='/images/icon-bg.png' alt='image' />
                  <img
                    src='/images/icon/icon8.png'
                    className='main-icon'
                    alt='image'
                  />
                </div>
                <h3>Compra Segura</h3>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
              <div className='single-funfacts-box'>
                <div className='icon'>
                  <img src='/images/icon-bg.png' alt='image' />
                  <img
                    src='/images/icon/icon9.png'
                    className='main-icon'
                    alt='image'
                  />
                </div>
                <h3>Evite filas</h3>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
              <div className='single-funfacts-box'>
                <div className='icon'>
                  <img src='/images/icon-bg.png' alt='image' />
                  <img
                    src='/images/icon/icon10.png'
                    className='main-icon'
                    alt='image'
                  />
                </div>
                <h3>Pague via PIX</h3>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
              <div className='single-funfacts-box'>
                <div className='icon'>
                  <img src='/images/icon-bg.png' alt='image' />
                  <img
                    src='/images/icon/icon11.png'
                    className='main-icon'
                    alt='image'
                  />
                </div>
                <h3>Conecte-se</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funfact;
