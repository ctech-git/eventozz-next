import Banner from '../components/HomeOne/Banner';
import AccountCreate from '../components/HomeTwo/AccountCreate';
import BestSeller from '../components/Common/BestSeller';
import BuySell from '../components/Common/BuySell';
import FunFact from '../components/HomeTwo/FunFact';
import FeedBack from '../components/Common/FeedBack';
import Portfolio from '../components/Common/Portfolio';
import OurFeature from '../components/Common/OurFeature';
import AdvisorArea from '../components/Common/AdvisorArea';
import RegisterArea from '../components/Common/RegisterArea';

const Index = () => {
  return (
    <>
      <Banner />
      <BuySell />
      {/* <BestSeller /> */}
      {/* <AccountCreate /> */}
      {/* <FeedBack /> */}
      <Portfolio bgColor='bg-main-color' contentColor='color-white' />
      {/* <OurFeature /> */}
      {/* <AdvisorArea /> */}
    </>
  );
};

export default Index;
