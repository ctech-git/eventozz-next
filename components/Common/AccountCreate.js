
const AccountCreate = ({ title }) => {
  return (
    <>
      <div className='account-create-process-area ptb-100 background-optional' >
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xl-8 col-lg-9 col-md-12'>
              <div className='account-create-process-content'>
                <div className='section-title'>
                  <h2>{title}</h2>
                  <p>
                    Com a Eventozz você terá todo o seu evento na palma da mão.<br />
                    Faça inscrições, venda ingressos e acompanhe a entrada de todo mundo.
                  </p>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-lg-4 col-sm-6 col-md-6'>
                    <div className='single-process-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon1.png' alt='image' />
                      </div>
                      <h3>Crie sua conta</h3>
                      <p>
                        Acesse a área do organizador ou entre em contato com a organização para
                        ter apoio na construção do seu evento.
                      </p>
                    </div>
                  </div>
                  <div className='col-lg-4 col-sm-6 col-md-6'>
                    <div className='single-process-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon2.png' alt='image' />
                      </div>
                      <h3>Comece a vender</h3>
                      <p>
                        Defina seus ingressos e inicie as vendas automaticamente com seu link personalizado!
                      </p>
                    </div>
                  </div>
                  <div className='col-lg-4 col-sm-6 col-md-6'>
                    <div className='single-process-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon3.png' alt='image' />
                      </div>
                      <h3>Faça dinheiro com seus eventos</h3>
                      <p>
                        Tenha o controle de todos os ingressos que foram vendidos.
                        Acompanhe todos os dados e faça o maior marketing possível para seu evento.
                        <br />


                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-3 col-md-12'>
              <div className='account-create-process-image text-center'>
                <img src='/images/wallet.png' alt='image' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCreate;
