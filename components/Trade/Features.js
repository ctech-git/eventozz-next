import { dateLastAccess } from '../../utils/strings';

const Features = (item) => {
  const dados = item.item;

  return (
    <>
      <div className='features-area pt-50 pb-70'>
        <div className='container'>
          <div className='section-title'>
            <h2>{dados.nome_evento}</h2>
            <div key={'x-event'} dangerouslySetInnerHTML={{
              __html: dados.descricao,
            }}>

            </div>
          </div>
          <div className='earn-money-area pt-100 pb-70'>
            <div className='container'>
              <div className='section-title'>
                <h2>Detalhes do Evento</h2>
              </div>
              <div className='row'>
                <div className='col-lg-6 col-md-12'>
                  <div className='earn-money-list'>
                    <ul>
                      <li>
                        <i className='fa fa-map'></i>
                        {dados.local_evento}
                      </li>
                      <li>
                        <i className='bx bx-cog'></i>
                        {dados.organizador}
                      </li>
                      <li>
                        <i className='bx bxs-badge-check'></i>
                        Apresentar Qr Code na Entrada
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-lg-6 col-md-12'>
                  <div className='earn-money-list'>
                    <ul>
                      <li>
                        <i className='bx bxs-badge-check'></i>
                        {dados.categoria_evento}
                      </li>
                      <li>
                        <i className='bx bx-calendar'></i>
                        Inicio: {dateLastAccess(dados.data_inicio)} - Fim: {dateLastAccess(dados.data_fim)}
                      </li>
                      <li>
                        <i className="fa fa-clock" aria-hidden="true"></i>
                        De {dados.hora_inicio} até {dados.hora_fim}
                      </li>
                    </ul>
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

export default Features;
