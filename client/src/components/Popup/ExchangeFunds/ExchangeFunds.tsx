import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import IExchangeFundsData from '../../../interfaces/IExchangeFundsData';
import { GetCurrencyCodes } from '../../../service/CurrenciesService';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { AiOutlineTransaction } from 'react-icons/ai';
import IExchangeFundsPopUp from '../../../interfaces/IExchangeFundsPopUp';
import { Exchange } from '../../../service/CurrentAccountService';

const ExchangeFunds: React.FC<IExchangeFundsPopUp> = ({ account_id, balance, currency, closeModalMethod, onRefresh }) => {
    const initialFormData: IExchangeFundsData = {
        account_id: account_id,
        initial_currency: currency,
        currency_to_convert: '',
        amount_to_exchange: 0,
    };

    const [codes, setCodes] = useState<string[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [formData, setFormData] = useState<IExchangeFundsData>(initialFormData);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData({
            ...formData,
            amount_to_exchange: parseFloat(formData['amount_to_exchange'].toString()), // Convert to number if needed
        });
        setInProgress(true);

        const result = await Exchange(formData);

        if (result === 'OK') {
            setError(false);
            setSuccess(true);
            setMessage('Account balance exchanged successfully');
        }
        else {
            setError(true);
            setSuccess(false);
            setMessage(result);
        }
        setInProgress(false);
    };

    useEffect(() => {
        setLoading(true);

        async function CurrenciesData() {
            const fetchedCodes = await GetCurrencyCodes();
            const filter = fetchedCodes.filter((x) => x !== currency);
            setCodes(filter); // remove current currency
            setFormData({
                ...formData,
                currency_to_convert: filter[0] // set first dropdown currency for default one
            });
            setLoading(false);
        }

        CurrenciesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed inset-0 flex -mt-64 items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-xl dark:backdrop-filter">
            <div className="bg-transparent w-96 rounded-lg p-6 transition-opacity duration-300">
                {loading ? <LoadingSpinner background='bg-transaprent' /> : <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                        <AiOutlineTransaction className="w-8 h-8 text-sky-500 dark:text-sky-400 inline" />

                        <span className="sr-only">Exchange Funds</span>
                    </div>
                    <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Exchange Funds</p>

                    {inProgress ? <div><span className='text-lg italic dark:text-white mb-12'>Processing transaction...<br /><br />
                        <LoadingSpinner background='bg-transparent' minH='0vh' /></span></div>
                        :

                        <form onSubmit={handleSubmit} className="py-2 dark:bg-gray-800">
                            <p className='text-lg dark:text-white mb-6 text-center font-medium'>Current balance: {balance} {currency}</p>
                            <div className="mb-4">
                            <label
                                htmlFor="first_name"
                                className="block text-start mb-2 font-medium text-gray-900 dark:text-white"
                            >
                                Amount
                            </label>
                                <input
                                    type="text"
                                    id="amount_to_exchange"
                                    name="amount_to_exchange"
                                    value={formData.amount_to_exchange}
                                    onChange={handleInputChange}
                                    autoFocus
                                    placeholder={'Amount to exchange: 100,00 ' + currency.toString()}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                    required
                                />
                            </div>
                            <label
                                htmlFor="first_name"
                                className="block text-start mb-2 font-medium text-gray-900 dark:text-white"
                            >
                                To
                            </label>
                            <select
                                id="currency_to_convert"
                                name="currency_to_convert"
                                value={formData.currency_to_convert}
                                onChange={handleInputChange}
                                className="bg-gray-50 border mb-8 pr-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                {codes.map((code, index) => (
                                    <option key={index} value={code}>{code}</option>
                                ))}
                            </select>
                            {error && <div className='my-5'>
                                <h4 className="text-rose-700 dark:text-rose-500 -mt-4 mb-4 text-lg">{message}</h4>
                            </div>}
                            {success && <div className='my-5'>
                                <h4 className="text-emerald-700 dark:text-emerald-500 -mt-4 mb-4 text-lg">{message}</h4>
                            </div>}
                            <button
                                onClick={() => onRefresh()}
                                type="submit"
                                className="bg-sky-700 ml-2 text-white font-semibold px-4 py-1 rounded-lg hover:bg-sky-800"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => { closeModalMethod(true); onRefresh(); }}
                                type="button"
                                className="bg-gray-300 ml-4 text-gray-700 font-semibold px-4 py-1 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </form>
                    }
                </div>}
            </div>
        </div>
    );
};

export default ExchangeFunds;
