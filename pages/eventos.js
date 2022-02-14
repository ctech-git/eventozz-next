import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(import('react-apexcharts'), { ssr: false });
import PageBanner from '../components/Common/PageBanner';
import servicesEventozz from '../services/events';


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
  const [optionsOne, setOptionsOne] = useState(options);
  const [seriesAll, setSeriesAll] = useState(series);

  const [isMounted, setisMounted] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setisMounted(true);
    setDisplay(true);
    setisMounted(false);
    console.log("============")
    console.log(events)
  }, []);

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
                  <div className='col-lg-4 col-md-4'>
                    <div className='single-blog-post'>
                      <div className='post-image'>
                        <a href='blog-details.html' className='d-block'>
                          <img src='/images/blog/blog1.jpg' alt='image' />
                        </a>
                        <div className='tag-list'>
                          <a href='blog.html'>Filecoin</a>
                        </div>
                      </div>
                      <div className='post-content'>
                        <h3>
                          <a href='blog-details.html'>
                            How Filecoin is Up 50% in a Week & Could Take More
                            Profits
                          </a>
                        </h3>
                        <p>
                          Borem ipsum dolor sit amet, adhuc iriure dissentias
                          est in, est ne diam graece tincidunt.
                        </p>
                        <div className='author d-flex align-items-center'>
                          <img src='/images/user/user1.jpg' alt='image' />
                          <a href='blog.html'>Steven Smith</a>
                        </div>
                        <a href='blog-details.html' className='link-btn'>
                          <i className='bx bx-right-arrow-alt'></i>
                        </a>
                      </div>
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

export default PriceDetails;
export async function getServerSideProps() {
  const result = await servicesEventozz.getEventzzGeneral();
  console.log(result);

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