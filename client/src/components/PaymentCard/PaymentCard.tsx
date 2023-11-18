import React from 'react';
import ICreditCardData from '../../interfaces/ICreditCardData';

const PaymentCard: React.FC<ICreditCardData> = ({card_number, cardholder_name, expiry_date, cvv, uid = 1}) => {
   
    return (
      <div className="w-96 h-56 mx-auto rounded-xl text-white shadow-2xl transition-transform transform">
        <img
          className="relative object-cover w-full h-full rounded-xl" alt=''
          src={'card' + (uid % 5 + 1) + '.jpg'}
        />
        <div className="w-full px-8 absolute top-8">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light">Name</p>
              <p className="font-medium tracking-widest">{cardholder_name}</p>
            </div>
            <img alt='' className="w-14 h-14" src={'p' + (uid % 3 + 1) + '.png'} />
          </div>
          <div className="pt-1">
            <p className="font-light">Card Number</p>
            <p className="font-medium tracking-more-wider">
            {card_number.replace(/\d(?=.{4,13}$)/g, '*')}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div className="">
                <p className="font-light text-xs">Expiry</p>
                <p className="font-medium tracking-wider text-sm">{expiry_date}</p>
              </div>
              <div className="">
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">{cvv}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PaymentCard;
