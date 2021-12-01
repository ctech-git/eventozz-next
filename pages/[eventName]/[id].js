import React, { useState, useEffect } from 'react';
import Banner from '../../components/Common/Banner';
import Features from '../../components/Trade/Features';
import BestSeller from '../../components/Common/BestSeller';
import PaymentArea from '../../components/Trade/PaymentArea';
import FeedBack from '../../components/Common/FeedBack';
import RegisterArea from '../../components/Common/RegisterArea';
import { useRouter } from 'next/router'
import ServicesEventozz from '../../services/events';


const Buy = () => {
  const router = useRouter();
  const { id } = router.query
  const [isEvent, setIsEvent] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    if (id != undefined) {
      console.log(id)
      getDetails(id);
    }
  }, [id]);

  async function getDetails(id) {
    const result = await ServicesEventozz.getEventosEspecific(id);
    console.log("+++++++++++++++++++");

    if (result.status == 200) {
      setIsEvent(true);
      var data = result?.data?.data[0];
      setItem(data);
      console.log(data);
    } else {
      setIsEvent(false);
    }
  }


  return (
    <>
      <Banner item={item} />
      <Features item={item} />
      {/* <BestSeller /> */}
      <PaymentArea />
      {/* <FeedBack /> */}
      <RegisterArea ctaImage='/images/man.png' />
    </>
  );
};

export default Buy;
