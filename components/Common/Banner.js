import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ServicesEventozz from '../../services/events';
import { dateLastAccess } from '../../utils/strings';

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
      <div className='trade-cryptocurrency-area ptb-100'
        style={{ background: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
      >
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-md-12'>
              <div className='trade-cryptocurrency-box'>

                <div className='section-title'>
                  <h2>Detalhes do Evento</h2>
                </div>
                <div className='row'>
                  <div className='col-lg-6 col-md-12'>
                    <div className='earn-money-list'>
                      <ul>
                        <li>
                          <i className='fa fa-map'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          {dados.local_evento}
                        </li>
                        <li>
                          <i className='bx bx-cog'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          {dados.organizador}
                        </li>
                        <li>
                          <i className='bx bxs-badge-check'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          Apresentar Qr Code na Entrada
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='earn-money-list'>
                      <ul>
                        <li>
                          <i className='bx bxs-badge-check'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          {dados.categoria_evento}
                        </li>
                        <li>
                          <i className='bx bx-calendar'
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          Inicio: {dateLastAccess(dados.data_inicio)} - Fim: {dateLastAccess(dados.data_fim)}
                        </li>
                        <li>
                          <i className="fa fa-clock" aria-hidden="true"
                            style={{ color: dados?.cor_principal ? (dados?.cor_principal) : ('linear-gradient(0deg, #0062ff, #081587)') }}
                          ></i>
                          De {dados.hora_inicio} até {dados.hora_fim}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
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
                        <i className='fas fa-minus'
                          style={{ color: dados?.cor_secundaria ? (dados?.cor_secundaria) : ('#00a79d') }}
                        ></i>
                        2.00 USD
                      </span>
                      <span className='second-span'>TOTAL CARD FEES</span>
                    </div>
                  </li>
                  <li>
                    <div className='d-flex align-items-center'>
                      <span className='first-span'>
                        <i className='fas fa-divide'
                          style={{ color: dados?.cor_secundaria ? (dados?.cor_secundaria) : ('#00a79d') }}
                        ></i>
                        47202
                      </span>
                      <span className='second-span'>CONVERSION RATE</span>
                    </div>
                  </li>
                </ul>

                <button type='button'
                  style={{ backgroundColor: dados?.cor_secundaria ? (dados?.cor_secundaria) : ('#00a79d') }}
                >
                  <i className='fa fa-plus'></i> Adicionar
                </button>
                <button type='button'
                  style={{ backgroundColor: dados?.cor_secundaria ? (dados?.cor_secundaria) : ('#00a79d') }}
                >
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
