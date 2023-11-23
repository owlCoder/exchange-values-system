import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ITransferFundsData from '../../../interfaces/ITransferFundsData';
import { GetCurrencyCodes } from '../../../service/CurrenciesService';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import ITransferFundsPopup from '../../../interfaces/ITransferFundsPopUp';
import { TbTransferVertical } from 'react-icons/tb';
import { useAuth } from '../../../contexts/AuthContext';

const TransferFunds: React.FC<ITransferFundsPopup> = ({ account_id, balance, currency, closeModalMethod, onRefresh }) => {
    const { currentUser } = useAuth();

    const initialFormData: ITransferFundsData = {
        sender_uid: currentUser ? currentUser.uid : -1,
        sender_account_id: account_id,
        amount: 0,
        receiver_uid: -1,
        receiver_account_number: '',
        receiver_email: '',
        receiver_name: '',
        receiver_surname: '',
        approved: "ON HOLD",
    };

    const [codes, setCodes] = useState<string[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [formData, setFormData] = useState<ITransferFundsData>(initialFormData);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setFormData({
        //     ...formData,
        //     amount_to_exchange: parseFloat(formData['amount_to_exchange'].toString()), // Convert to number if needed
        // });
        setInProgress(true);

        // const result = await Exchange(formData);

        // if (result === 'OK') {
        //     setError(false);
        //     setSuccess(true);
        //     setBalanceState(balanceState - formData.amount_to_exchange);
        //     setMessage('Account balance exchanged successfully');
        // }
        // else {
        //     setError(true);
        //     setSuccess(false);
        //     setMessage(result);
        // }
        setInProgress(false);
    };

    return (
        <div className="fixed inset-0 flex -mt-64 items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-xl dark:backdrop-filter">
            <div className="bg-transparent w-96 rounded-lg p-6 transition-opacity duration-300">
                {loading ? <LoadingSpinner background='bg-transaprent' /> : <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                        <TbTransferVertical className="w-8 h-8 text-sky-500 dark:text-sky-400 inline" />

                        <span className="sr-only">Transfer Funds</span>
                    </div>
                    <p className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Transfer Funds</p>

                    {inProgress ? <div><span className='text-lg italic dark:text-white mb-12'>Processing transaction...<br /><br />
                        <LoadingSpinner background='bg-transparent' minH='0vh' /></span></div>
                        :

                        <form onSubmit={handleSubmit} className="py-2 dark:bg-gray-800">
                            <p className='text-lg dark:text-white mb-6 text-center font-medium'>Current balance: {balance.toFixed(4)} {currency}</p>
                            <div className="mb-4">
                                <label
                                    htmlFor="first_name"
                                    className="block text-start mb-2 font-medium text-gray-900 dark:text-white"
                                >
                                    Amount
                                </label>
                                <input
                                    type="text"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    autoFocus
                                    placeholder={'Amount to transfer: 100,00 ' + currency.toString()}
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
                           {/* todo */}
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
                                onClick={() => { closeModalMethod(true); }}
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

export default TransferFunds;
