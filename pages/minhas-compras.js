import PageBanner from '../components/Common/PageBanner';
import RegisterArea from '../components/Common/RegisterArea';
import AppDownload from '../components/Common/AppDownload';
import RegisterAreaTwo from '../components/Common/RegisterAreaTwo';
import Link from 'next/link';
import servicesEventozz from '../services/events';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';
import { Button, Container } from 'react-bootstrap';
import { EventDetails } from '../components/EventDetails';

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
  const [eventzz, setEventzz] = useState([]);
  const [eventId, setEventId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const getUserEventzz = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const result = await servicesEventozz.getUserEventzz({ accessToken });
    setIsLoading(false);
    if (result?.data?.success) {
      setEventzz(result?.data?.data);
      //nome_evento
      //descricao
      //status_descricao = pending | paid | failed | gratuito
    }
  }, [])

  useEffect(() => {
    getUserEventzz();
  }, [])

  const selectStatus = (string) => {
    switch (string) {
      case "paid":
        return "Pago com Sucesso";
      case "pending":
        return "Pagamento Pendente";
      case "failed":
        return "Pagamento Invalido";
      default:
        break;
    }
  }
  const selectStatusIcon = (string) => {
    switch (string) {
      case "paid":
        return "bx bx-check-double";
      case "pending":
        return "bx bx-loader-circle";
      case "failed":
        return "bx bx-message-square-x";
      default:
        break;
    }
  }

  const formatEventDate = (item) => {
    console.log(item);
    let date = '';
    if (item?.startDate === item?.endDate) {
      date = `${item.startDate} de ${item.startTime} a ${item.endTime}`;
    } else {
      date = `de ${item.startDate} ${item.startTime} a ${item.endDate} ${item.endTime}`
    }

    return date;
  }

  const handleOpenEventDetails = (item) => {
    console.log(item);
    setEventId(item);
    setShowEventDetails(true)
  }

  const handleHideEventDetails = () => {
    setShowEventDetails(false);
  }

  const LoadingCheckout = () => (
    <div className='container-minhas-compras'>
      <div className='container-spinner minhas-compras'>
        <div class="spinner-border absolute" role="status">
          <span class="sr-only"></span>
        </div>
        <h2 className='pt-2'>Buscando ingressos...</h2>
      </div>
    </div>
  )

  return (
    <>
      <PageBanner
        pageTitle='Bem Vindo ao Seu Perfil'
        pageSubTitle='Aqui você tem acesso a todos os seus ingressos'
      />
      {
        !showEventDetails && (
          <div className='wallet-area ptb-100'>
            <div className='container'>
              <div className='wallet-tabs'>
                <div className='row align-items-center'>
                  {
                    isLoading ? (
                      <LoadingCheckout />
                    ) : (
                      eventzz.map((item, index) => {
                        let iconPayment = selectStatusIcon(item.statusDescription);
                        return (
                          <div className='col-lg-4 col-md-12 box-ticket'>
                            <div className='tab-content' id='myTabContent'>
                              <div className='tab-pane fade show active' id='security' role='tabpanel' >
                                <div className='box'>
                                  <h3>{item.eventName}</h3>
                                  <p>{item.categoria_evento}</p>
                                  <p>Local do evento: {item.eventPlace}</p>
                                  <p>Data: {formatEventDate(item)}</p>
                                  <ul className='features-list'>
                                    <li>
                                      <i className={iconPayment}></i> {
                                        selectStatus(item.statusDescription)
                                      }
                                    </li>
                                  </ul>
                                  {/* <Link href='/about'> */}
                                  <Button className='default-btn' onClick={() => handleOpenEventDetails(item)}>
                                    <i className='bx bxs-bookmark-alt-minus'></i> Ver detalhes
                                  </Button>
                                  {/* </Link> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        showEventDetails && (
          <>
            <Container>
              <EventDetails handleClose={handleHideEventDetails()} eventId={eventId} />
            </Container>
            <Button onClick={() => handleHideEventDetails()} className='back-icon linkNavbar'>
              <i className='bx bx-x'></i>
            </Button>
          </>
        )
      }
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
