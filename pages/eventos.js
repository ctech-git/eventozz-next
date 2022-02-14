import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(import('react-apexcharts'), { ssr: false });
import PageBanner from '../components/Common/PageBanner';
import servicesEventozz from '../services/events';
import { dateLastAccess } from '../utils/strings';
import { useRouter } from 'next/router';


const options = {
  chart: {
    id: 'basic-bar',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  title: {
    text: 'Bitcoin price: $48.98'
  }
},
  series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

const PriceDetails = ({ events = [] }) => {
  const router = useRouter()

  const [optionsOne, setOptionsOne] = useState(options);
  const [seriesAll, setSeriesAll] = useState(series);

  const [isMounted, setisMounted] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setisMounted(true);
    setDisplay(true);
    setisMounted(false);
    console.log("----------------");
    console.log(events);
    console.log("----------------");
  }, []);
  function goToEvents(slug) {
    console.log(slug)
    // let link = nome.replaceAll(" ", "-");
    router.push(`/evento/${slug}`);
  }


  return (
    <>
      <PageBanner
        pageTitle='Eventos'
        pageSubTitle='Veja todos os eventos feitos na nossa plataforma'
      />

      <div className='cryptocurrency-details-area ptb-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 col-md-12'>
              <div className='cryptocurrency-top-stories'>
                <div className='row justify-content-center'>
                  {events.map((item, index) => {
                    return (

                      <div className='col-lg-4 col-md-4'>
                        <div className='single-blog-post' onClick={() => goToEvents(item.slug)}>
                          <div className='post-image'>
                            <a className='d-block'>
                              <img src={item.foto} alt='image' />
                            </a>
                            <div className='tag-list'>
                              <a className={item.active ?
                                ("open-button") :
                                ("close-button")}
                              >{
                                  item.active ?
                                    ("Aberto") :
                                    ("Fechado")}
                              </a>
                            </div>
                          </div>
                          <div>
                            <label>{dateLastAccess(item.data_inicio)}</label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              viewBox="0 0 24 24">
                              <path fill-rule="evenodd"
                                d="M15.494 12.6a.85.85 0 01-.253.51l-5.246 5.14a.89.89 0 01-.847.22.868.868 0 01-.619-.61.847.847 0 01.23-.828l4.624-4.532L8.76 7.968a.847.847 0 01-.23-.829.868.868 0 01.619-.61.89.89 0 01.847.221l5.246 5.14a.847.847 0 01.253.71z">
                              </path>
                            </svg>
                            <label>{dateLastAccess(item.data_fim)}</label>
                          </div>
                          <div className='post-content'>
                            <h3>
                              <a >
                                {item.nome_evento}
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                    )
                  })}


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceDetails;

export async function getServerSideProps() {
  const result = await servicesEventozz.getEventzzGeneral();
  console.log("----------------");
  console.log(result);
  console.log("----------------");

  let response = [];

  if (result?.status === 200 && result?.data?.success) {
    response = result?.data?.data;
  }

  return {
    props: {
      events: response
    },
  }
}