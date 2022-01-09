import { scrollToElement } from '../../utils/scrollTo';
import { dateLastAccess } from '../../utils/strings';

const Features = ({item, showTicketSale}) => {
  const dados = item;

  return (
    <>
      <div className='features-area pt-100 pb-70'>
        <div className='container'>
          <div className='section-title'>
            {/* <h2>{dados.nome_evento}</h2> */}
            <div key={'x-event'} dangerouslySetInnerHTML={{
              __html: dados.descricao,
            }}>

            </div>
          </div>
        </div>
        {showTicketSale && <div onClick={() => scrollToElement({id: 'tickets-sale-area'})} className="justify-content-center pt-4 row btn-compre-agora absolute"><a className="default-btn"><i className="bx bxs-chat"></i>Comprar agora</a></div>}
      </div>
    </>
  );
};

export default Features;
