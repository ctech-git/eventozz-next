import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Banner = () => {
  const [name, setName] = useState('Bitcoin');
  const [nameTwo, setNameTwo] = useState('USD');

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
  return (
    <>
      <div className='banner-area'>
        <div className='container'>
          <div className='banner-content'>
            <h1>Participe & Organize Eventos, de forma simples e pratica!</h1>

          </div>
          <div className='banner-image'>
            <img src='/images/banner/banner-img2.png' alt='image' />
          </div>
        </div>
        <div className='shape1'>
          <img src='/images/shape/shape1.png' alt='image' />
        </div>
        <div className='shape2'>
          <img src='/images/shape/shape2.png' alt='image' />
        </div>
        <div className='shape3'>
          <img src='/images/shape/shape3.png' alt='image' />
        </div>
        <div className='shape4'>
          <img src='/images/shape/shape4.png' alt='image' />
        </div>
      </div>
    </>
  );
};

export default Banner;
