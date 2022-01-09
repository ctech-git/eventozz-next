import React from 'react';
import Image from 'next/image';

import Visa from '../../public/images/payment/visa.png';
import MasterCard from '../../public/images/payment/master-card.png';
import AmericanExpress from '../../public/images/payment/american-express.png';
import Elo from '../../public/images/payment/elo.png';
import Boleto from '../../public/images/payment/boleto.png';
import Pix from '../../public/images/payment/pix.png';

const PaymentArea = () => {
  return (
    <>
      <div className='payment-method-area ptb-100 bg-f9f9f9'>
        <div className='container'>
          <div className='section-title'>
            <h2>Metodos de Pagamentos Aceitos</h2>
          </div>
          <ul className='payment-method-list'>
            <li title='Visa'>
              <Image src={Visa} alt='Visa' />
            </li>
            <li title='Master Card'>
              <Image src={MasterCard} alt='Master Card' />
            </li>
            <li title='American Express'>
              <Image src={AmericanExpress} alt='Image' />
            </li>
            <li title='Elo'>
              <Image src={Elo} alt='Elo' />
            </li>
            {/* <li title='Boleto'>
              <Image src={Boleto} alt='Boleto' />
            </li> */}
            <li title='Pix'>
              <Image src={Pix} alt='Pix' />
            </li>

            {/* <li title='Apple Pay'>
              <img src='/images/payment/apple-pay.png' alt='image' />
            </li>
            <li title='Stripe'>
              <img src='/images/payment/stripe.png' alt='image' />
            </li>
            <li title='Giro Pay'>
              <img src='/images/payment/giro-pay.png' alt='image' />
            </li>

            <li title='Skrill'>
              <img src='/images/payment/skrill.png' alt='image' />
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PaymentArea;
