import { dateLastAccess } from '../../utils/strings';

const Features = (item) => {
  const dados = item.item;

  return (
    <>
      <div className='features-area pt-100 pb-70'>
        <div className='container'>
          <div className='section-title'>
            <h2>{dados.nome_evento}</h2>
            <div key={'x-event'} dangerouslySetInnerHTML={{
              __html: dados.descricao,
            }}>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
