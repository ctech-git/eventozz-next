import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { AuthContext } from '../../context/auth';
import { scrollToElement } from '../../utils/scrollTo';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

const Banner = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { userToken } = authContext;
  console.log(userToken);
  const [name, setName] = useState('Bitcoin');
  const [nameTwo, setNameTwo] = useState('USD');
  const isMobile = useMediaQuery({ maxWidth: 768 })

  //api data
  const [newData, setnewData] = useState([]);

  //converter hook
  const [conversionValue, setConversionValue] = useState('');
  const [cryptoQuantity, setcryptoQuantity] = useState(1);
  const [coinSymbol, setcoinSymbol] = useState('BTC');

  const [image, setImage] = useState(
    '/images/cryptocurrency/cryptocurrency2.png'
  );
  const [imageTwo, setImageTwo] = useState(
    '/images/cryptocurrency/cryptocurrency1.png'
  );

  const [clicked, setClicked] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [toggleStateTwo, setToggleStateTwo] = useState(false);

  const toggleTabOne = () => {
    setToggleState(!toggleState);
  };

  const toggleSelected = (cat, index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
    setName(cat.name);
    setImage(cat.image);
    setcoinSymbol(cat.symbol.toUpperCase());
  };

  useEffect(() => {
    const getCoins = async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      );
      setnewData(data);
    };
    getCoins();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=${coinSymbol}&tsyms=USD`
      );

      setConversionValue(data.USD);
    };
    getData();
  }, [coinSymbol]);
  console.log(isMobile);
  return (
    <>
      <div className='main-banner-area'>
        {isMobile ? <img src='/images/banner/banner-eventozz-mobile.png' alt='image' /> : <img className='img-banner-eventozz' src='/images/banner/banner-eventozz.png' alt='image' />}
        {/* <div className='container'>
          <div className='row align-items-center m-0'>
            
          </div>
        </div> */}
        <div className='shape1'>
          <img src='/images/shape/shape1.png' alt='image' />
        </div>
        <div className='shape2'>
          <img src='/images/shape/shape2.png' alt='image' />
        </div>
        <div className='shape3'>
          <img src='/images/shape/shape3.png' alt='image' />
        </div>
        <div className='shape5'>
          <img src='/images/shape/shape5.png' alt='image' />
        </div>
        <div className='shape9'>
          <img src='/images/shape/shape9.png' alt='image' />
        </div>
      </div>
    </>
  );
};

export default Banner;
