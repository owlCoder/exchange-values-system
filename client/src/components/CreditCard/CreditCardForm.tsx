import React, { useState } from 'react';

const CreditCardForm: React.FC = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isExpiryDateValid = (expiryDate: string) => {
    const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/yy format
    return pattern.test(expiryDate);
  };

  const isCVVValid = (cvv: string) => {
    const pattern = /^\d{3}$/; // 3-digit number
    return pattern.test(cvv);
  };

  return (
    <div className="p-4 dark:bg-gray-800">
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700 dark:text-white">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            className="form-input"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="XXXX XXXX XXXX XXXX"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cardName" className="block text-gray-700 dark:text-white">Cardholder Name</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            className="form-input"
            value={formData.cardName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label htmlFor="expiryDate" className="block text-gray-700 dark:text-white">Expiry Date (MM/yy)</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              className={`form-input ${isExpiryDateValid(formData.expiryDate) ? '' : 'border-red-500'}`}
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/yy"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="cvv" className="block text-gray-700 dark:text-white">CVC (3 digits)</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              className={`form-input ${isCVVValid(formData.cvv) ? '' : 'border-red-500'}`}
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
            />
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreditCardForm;
