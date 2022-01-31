import PageBanner from '../components/Common/PageBanner';
import RegisterArea from '../components/Common/RegisterArea';
import AppDownload from '../components/Common/AppDownload';
import RegisterAreaTwo from '../components/Common/RegisterAreaTwo';
import Link from 'next/link';

const Wallet = () => {

  const Eventozz = [
    {
      "id": 1,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PAGO",
      "data": "20/09/2021"
    },
    {
      "id": 2,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PENDENTE",
      "data": "20/09/2021"
    },
    {
      "id": 3,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PAGO",
      "data": "20/09/2021"
    },
    {
      "id": 4,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "FALHA",
      "data": "20/09/2021"
    },
    {
      "id": 5,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PAGO",
      "data": "20/09/2021"
    },
    {
      "id": 6,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PAGO",
      "data": "20/09/2021"
    },
    {
      "id": 7,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PAGO",
      "data": "20/09/2021"
    },
    {
      "id": 8,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PAGO",
      "data": "20/09/2021"
    },
    {
      "id": 9,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PAGO",
      "data": "20/09/2021"
    },
    {
      "id": 10,
      "nome": "Gerado Rufino",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "status": "PAGO",
    }
  ];

  const selectStatus = (string) => {
    switch (string) {
      case "PAGO":
        return "Pago com Sucesso";
      case "PENDENTE":
        return "Pagamento Pendente";
      case "FALHA":
        return "Pagamento Invalido";
      default:
        break;
    }
  }
  const selectStatusIcon = (string) => {
    switch (string) {
      case "PAGO":
        return "bx bx-check-double";
      case "PENDENTE":
        return "bx bx-loader-circle";
      case "FALHA":
        return "bx bx-message-square-x";
      default:
        break;
    }
  }

  return (
    <>
      <PageBanner
        pageTitle='Bem Vindo ao Seu Perfil'
        pageSubTitle='Aqui você tem acesso a todos os seus ingressos'
      />
      <div className='wallet-area ptb-100'>
        <div className='container'>
          <div className='wallet-tabs'>
            <div className='row align-items-center'>
              {Eventozz.map((item, index) => {
                let iconPayment = selectStatusIcon(item.status);
                return (
                  <div className='col-lg-4 col-md-12 box-ticket'>
                    <div className='tab-content' id='myTabContent'>
                      <div className='tab-pane fade show active' id='security' role='tabpanel' >
                        <div className='box'>
                          <h3>{item.nome}</h3>
                          <p> {item.descricao} </p>
                          <ul className='features-list'>
                            <li>
                              <i className={iconPayment}></i> {
                                selectStatus(item.status)
                              }
                            </li>
                          </ul>
                          <Link href='/about'>
                            <a className='default-btn'>
                              <i className='bx bxs-bookmark-alt-minus'></i> Ver Ingresso
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>
      <RegisterArea
        bgGradient='bg-gradient-image'
        blackText='black-text'
        ctaImage='/images/man-with-ipad.png'
      />
      {/* <RegisterArea ctaImage='/images/man.png' /> */}
    </>
  );
};

export default Wallet;
