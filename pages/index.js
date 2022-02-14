import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/HomeOne/Banner';
import Funfact from '../components/Common/Funfact';
import BuySell from '../components/HomeOne/BuySell';
import AccountCreate from '../components/Common/AccountCreate';
import Platform from '../components/HomeOne/Platform';
import FeedBack from '../components/HomeOne/FeedBack';
import Portfolio from '../components/Common/Portfolio';
import OurFeature from '../components/Common/OurFeature';
import AppDownload from '../components/Common/AppDownload';
import RegisterAreaTwo from '../components/Common/RegisterAreaTwo';
import servicesEventozz from '../services/events';

const Index = ({events}) => {
  console.log('eventos -> ', events);
  return (
    <>
      <Banner />
      <Funfact id="funfact-area-banner" pt100='pt-100' />
      {/* <BuySell pt70='pt-70' /> */}
      <Platform events={events} />
      {/* <AccountCreate title='Get Started in a Few Minutes' /> */}
      {/* <Portfolio bgColor='bg-f9f9f9' /> */}
      {/* <OurFeature title='Our Features' /> */}
      <AppDownload />
      {/* <FeedBack /> */}
      {/* <RegisterAreaTwo title='Start Trading on Novis' /> */}
    </>
  );
};

export default Index;

export async function getServerSideProps() {
  const result = await servicesEventozz.getEventzz();
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