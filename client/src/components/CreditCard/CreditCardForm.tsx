import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useAuth } from '../../contexts/AuthContext';
import { isCardNumberValid, isExpiryDateValid, isCVVValid } from '../../utils/CreditCard/DataValidator';
import ICreditCardData from '../../interfaces/ICreditCardData';
import { SaveCreditCardData } from '../../service/CreditCardsService';

const CreditCardForm: React.FC = () => {
  const { currentUser } = useAuth();

  const initialFormData: ICreditCardData = {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    uid: currentUser?.uid,
  };

  const [formData, setFormData] = useState<ICreditCardData>(initialFormData);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .substring(0, 19);
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === 'expiryDate') {
      const cleanedValue = value.replace(/\D/g, '').substring(0, 4);
      if (cleanedValue.length === 4) {
        const month = cleanedValue.substring(0, 2);
        const year = cleanedValue.substring(2, 4);
        setFormData({ ...formData, [name]: `${month}/${year}` });
      } else {
        setFormData({ ...formData, [name]: cleanedValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response: string | undefined = await SaveCreditCardData(formData);

      if (response && response === 'Success') {
        setFormData(initialFormData);
        setShowMessage(true);
      } else {
        setShowMessage(false);
        setError(response ? response : 'Credit card service is unavailable');
      }
    } catch (error) {
        setError('Credit card already exist in system');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="py-4 dark:bg-gray-800">
      {/* Card Number */}
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block font-medium text-gray-900 dark:text-white pb-1">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder='XXXX XXXX XXXX XXXX'
          className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${isCardNumberValid(formData.cardNumber) ? '' : 'border-red-500'
            }`}
          value={formData.cardNumber}
          onChange={handleInputChange}
          required
          maxLength={19}
        />
        {!isCardNumberValid(formData.cardNumber) && formData.cardNumber.length > 0 && (
          <p className="text-red-500 mt-1">Please enter a valid 16-digit card number.</p>
        )}
      </div>

      {/* Cardholder Name */}
      <div className="mb-4">
        <label htmlFor="cardName" className="block font-medium text-gray-900 dark:text-white pb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          placeholder='Antonio Men'
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          value={formData.cardName}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Expiry Date and CVV */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="expiryDate" className="block font-medium text-gray-900 dark:text-white pb-1">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder='MM/YY'
            className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${isExpiryDateValid(formData.expiryDate) ? '' : 'border-red-500'
              }`}
            value={formData.expiryDate}
            onChange={handleInputChange}
            required
            maxLength={5}
          />
          {!isExpiryDateValid(formData.expiryDate) && formData.expiryDate.length > 0 && (
            <p className="text-red-500 mt-1">Please enter a valid expiry date (MM/YY).</p>
          )}
        </div>
        <div>
          <label htmlFor="cvv" className="block font-medium text-gray-900 dark:text-white pb-1">
            CVC
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder='123'
            className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${isCVVValid(formData.cvv) ? '' : 'border-red-500'
              }`}
            value={formData.cvv}
            onChange={handleInputChange}
            required
            maxLength={3}
          />
          {!isCVVValid(formData.cvv) && formData.cvv.length > 0 && (
            <p className="text-red-500 mt-1">Please enter a valid 3-digit CVV number.</p>
          )}
        </div>
      </div>
      <div>
        {error !== '' ?
          <h4 className="text-red-700 dark:text-red-500 my-2 text-center">{error}</h4>
          : <></>}
        {showMessage && <h4 className="text-emerald-700 dark:text-emerald-500 my-2 text-center">Your credit card details has been saved successfully</h4>}
      </div>
      {/* Submit button */}
      <button
        type="submit"
        className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg text-md font-semibold px-5 py-2.5 mt-3 text-center dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
      >
        {loading ? 'Submitting data...' : 'Save Credit Card'} <AiOutlineSend className="inline ml-1 text-xl -mt-1" />
      </button>
    </form>
  );
};

export default CreditCardForm;
