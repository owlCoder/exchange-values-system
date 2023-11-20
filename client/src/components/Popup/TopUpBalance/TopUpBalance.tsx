import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ITopUpPopup from '../../../interfaces/ITopUpPopup';
import { GetCurrencyCodes } from '../../../service/CurrenciesService';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { AiOutlineArrowUp } from 'react-icons/ai';
import ITopUpAccountData from '../../../interfaces/ITopUpAccountData';
import { TopUp } from '../../../service/CurrentAccountService';

const TopUpBalance: React.FC<ITopUpPopup> = ({ card_number, uid, closeModalMethod }) => {
    const initialFormData: ITopUpAccountData = {
        currency: '',
        amount: 0,
        card_number: '',
        uid: uid ? uid : 0,
    };

    const [codes, setCodes] = useState<string[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [formData, setFormData] = useState<ITopUpAccountData>(initialFormData);
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
            amount: parseFloat(formData['amount'].toString()), // Convert to number if needed
        });
        setInProgress(true);

        const result = await TopUp(formData);

        if (result === 'OK') {
            setError(false);
            setSuccess(true);
            setMessage('Account balance topped up successfully');
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
            setCodes(fetchedCodes);
            setFormData(formData => ({ ...formData, currency: fetchedCodes[0] }));
            setFormData(formData => ({ ...formData, card_number: card_number }));
            if (uid)
                setFormData(formData => ({ ...formData, uid: uid }));
            setLoading(false);
        }

        CurrenciesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed inset-0 flex -mt-64 items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
            <div className="bg-transparent w-96 rounded-lg p-6 transition-opacity duration-300">
                {loading ? <LoadingSpinner background='bg-transaprent' /> : <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                        <AiOutlineArrowUp className="w-8 h-8 text-sky-500 dark:text-sky-400 inline" />

                        <span className="sr-only">Top Up Account Balance</span>
                    </div>
                    <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Top Up Account Balance</p>

                    {inProgress ? <div><span className='text-lg italic dark:text-white mb-12'>Processing transaction...<br /><br />
                        <LoadingSpinner background='bg-transparent' minH='0vh' /></span></div>
                        :

                        <form onSubmit={handleSubmit} className="py-2 dark:bg-gray-800">
                            <select
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                className="bg-gray-50 border mb-5 pr-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                {codes.map((code, index) => (
                                    <option key={index} value={code}>{code}</option>
                                ))}
                            </select>

                            <div className="mb-8">
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder='1000,00'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                    required
                                />
                            </div>
                            {error && <div className='my-5'>
                                <h4 className="text-rose-700 dark:text-rose-500 -mt-4 mb-4 text-lg">{message}</h4>
                            </div>}
                            {success && <div className='my-5'>
                                <h4 className="text-emerald-700 dark:text-emerald-500 -mt-4 mb-4 text-lg">{message}</h4>
                            </div>}
                            <button
                                type="submit"
                                className="bg-sky-700 ml-2 text-white font-semibold px-4 py-1 rounded-lg hover:bg-sky-800"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => closeModalMethod(<div></div>)}
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

export default TopUpBalance;
