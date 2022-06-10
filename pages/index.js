import React from 'react';
import Banner from '../components/HomeOne/Banner';
import AccountCreate from '../components/Common/AccountCreate';
import AppDownload from '../components/Common/AppDownload';
import servicesEventozz from '../services/events';
import { EventzzContainer } from '../components/EventzzContainer';
import { MetaTagsIndex } from '../components/MetaTagsIndex';

const Index = ({ events }) => {
  // console.log('eventos -> ', events);
  return (
    <>
      <MetaTagsIndex />
      <Banner />
      <EventzzContainer events={events} />
      <AccountCreate title='Organize seu evento em poucos minutos' />
      <AppDownload />
    </>
  );
};

export default Index;

export async function getServerSideProps() {
  const result = await servicesEventozz.getEventzz();
  // console.log('result -> ', result);

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