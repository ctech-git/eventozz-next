import PageBanner from '../components/Common/PageBanner';
import RegisterArea from '../components/Common/RegisterArea';
import servicesEventozz from '../services/events';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
// import QRCode from 'qrcode'
import { QRCode } from "react-qr-svg";


const Wallet = () => {

  const [eventzz, setEventzz] = useState([]);
  const [eventId, setEventId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const getUserEventzz = useCallback(async () => {
    const result = await servicesEventozz.getUserEventzz();
    setIsLoading(false);
    if (result?.data?.success) {

      setEventzz(result?.data?.data);

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

    let date = '';
    if (item?.startDate === item?.endDate) {
      date = `${item.startDate} de ${item.startTime} a ${item.endTime}`;
    } else {
      date = `de ${item.startDate} ${item.startTime} a ${item.endDate} ${item.endTime}`
    }

    return date;
  }

  const handleOpenEventDetails = (item) => {

    setEventId(item)
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
      {
        !showEventDetails ? (
          <>
            <PageBanner
              pageTitle='Historico'
              pageSubTitle='Aqui você tem acesso a todos os seus ingressos'
            />
            <div className='wallet-area ptb-100'>
              <div className='container'>
                <div className='wallet-tabs'>
                  <div className='row align-items-center'>
                    {
                      isLoading ? (
                        <LoadingCheckout />
                      ) : (
                        eventzz.map((item, index) => {
                          console.log(item)
                          let iconPayment = selectStatusIcon(item.statusDescription);
                          return (
                            <div className='col-lg-4 col-md-12'>

                              <div className='tab-pane fade show active' id='security' role='tabpanel' >
                                <div className='box'>
                                  <h4>{item.id} - {item.eventName}</h4>
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
                                  {
                                    (item.statusDescription == 'paid' || item.isFree == "1" || item.isFree == 1 || item.isFree == true) && (
                                      <Button className='default-btn' onClick={() => handleOpenEventDetails(item)}>
                                        <i className='bx bxs-bookmark-alt-minus'></i> Ver detalhes
                                      </Button>
                                    )}
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
          </>
        ) : (
          <>
            <Container>
              <div className="container-flexEnd">
                <div onClick={() => handleHideEventDetails()} className='linkNavbar'>
                  <i className='bx bx-x'></i>
                </div>
              </div>
              <div className='head-event'>
                <h4>{eventId.id} - {eventId.eventName}</h4>
              </div>
              <div className='wallet-area ptb-100'>
                <div className='container'>
                  <div className='wallet-tabs'>
                    <div className='row align-items-center'>
                      {eventId.ticketsSale.map((item, index) => {
                        console.log(item)
                        return (
                          <>
                            <div className='col-lg-4 col-md-12'>
                              <div className='tab-pane fade show active'>
                                <div className='box'>
                                  <h4>{item.id} - {item.nome}</h4>
                                  <p>{item.email}</p>
                                  <QRCode
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="Q"
                                    style={{ width: 256 }}
                                    value={item?.codigo}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </>
        )
      }

    </>
  );
};

export default Wallet;
