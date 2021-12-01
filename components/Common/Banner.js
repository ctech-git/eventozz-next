import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ServicesEventozz from '../../services/events';

const Banner = (item) => {
  const dados = item.item;
  const [name, setName] = useState('Bitcoin');
  const [nameTwo, setNameTwo] = useState('USD');

  //api data
  const [newData, setnewData] = useState([]);

  //converter hook
  const [conversionValue, setConversionValue] = useState('');
  const [coinSymbol, setcoinSymbol] = useState('BTC');
  const [cryptoQuantity, setcryptoQuantity] = useState(1);

  const [image, setImage] = useState('/images/voucher.png');
  const [imageTwo, setImageTwo] = useState('/images/cryptocurrency/cryptocurrency1.png');

  const [clicked, setClicked] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [toggleStateTwo, setToggleStateTwo] = useState(false);

  const toggleTabOne = () => {
    setToggleState(!toggleState);
  };

  const toggleTabTwo = () => {
    setToggleStateTwo(!toggleStateTwo);
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

  const toggleSelectedTwo = (cat, index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
    setNameTwo(cat.name);
    setImageTwo(cat.image);
  };

  useEffect(() => {
    getTickets();
  }, []);

  async function getTickets() {
    const result = await ServicesEventozz.getTickets(dados.id);
    console.log("======INGRESSOS=====")
    console.log(result)
  }

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
      <div className='trade-cryptocurrency-area ptb-50'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-md-12'>
              <img
                className="img-eventozz-buy-page"
                src={dados.foto}
                alt='image'
              />
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='trade-cryptocurrency-box'>
                <div className='currency-selection'>
                  <label>Quantidade</label>
                  <input
                    type='text' value={cryptoQuantity}
                    onChange={(e) => setcryptoQuantity(e.target.value)}
                  />
                  <div
                    className={toggleState ? 'width-select dropdown show' : 'width-select dropdown'}
                    onClick={() => toggleTabOne()}
                  >
                    <button
                      className='dropdown-toggle'
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <img src={image} alt='image' />
                      {name}
                    </button>
                  </div>
                </div>
                <ul className='features-list'>
                  <li>
                    <div className='d-flex align-items-center'>
                      <span className='first-span'>
                        <i className='fas fa-minus'></i>
                        2.00 USD
                      </span>
                      <span className='second-span'>TOTAL CARD FEES</span>
                    </div>
                  </li>
                  <li>
                    <div className='d-flex align-items-center'>
                      <span className='first-span'>
                        <i className='fas fa-divide'></i>
                        47202
                      </span>
                      <span className='second-span'>CONVERSION RATE</span>
                    </div>
                  </li>
                </ul>

                <button type='button'>
                  <i className='fa fa-plus'></i> Adicionar
                </button>
                <button type='button'>
                  <i className='bx bxs-hand-right'></i> Comprar
                </button>

              </div>
            </div>
          </div>
        </div>
        <div className='lines'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
    </>
  );
};

export default Banner;
