import React, { useEffect, useState } from 'react';
import { ICreditCardModal } from '../../../interfaces/CreditCards/ICreditCardModal';
import { ICreditCardData } from '../../../interfaces/CreditCards/ICreditCardData';
import { AiFillCheckCircle, AiFillInfoCircle } from 'react-icons/ai';
import { ActivateCreditCard, GetUsersCreditCards } from '../../../service/CreditCardsService';
import LoadingSpinner from '../../Layout/LoadingSpinner/LoadingSpinner';

const CreditCardsPerUserModal: React.FC<ICreditCardModal> = ({ uid, ModalClose, RefreshDataBackground }) => {
    const [data, setData] = useState<ICreditCardData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    function GetCreditCardsData(): void {
        setLoading(true);
        GetUsersCreditCards(uid)
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                setData([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function Activation(card_number: string | undefined): void {
        setLoading(true);
        ActivateCreditCard(card_number, uid)
            .then(() => {
                setError('');
                GetCreditCardsData();
                RefreshDataBackground();
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        setLoading(true);
        GetCreditCardsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ?
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
                    <LoadingSpinner background='bg-transparent' />
                </div>
                :
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
                    <div className="bg-white dark:bg-gray-900 w-3/4 rounded-xl p-6 shadow-lg transition-opacity duration-300">
                        <h2 className="text-2xl font-semibold dark:text-white mb-4">
                            Credit Cards
                        </h2>
                        <h3 className='mb-3 text-red-600 text-center'>{error}</h3>
                        <div>
                            {data.length !== 0 ?
                                <table className="w-full text-md text-left text-black dark:text-white rounded-lg overflow-hidden">
                                    <thead className="text-lg text-white bg-sky-700">
                                        <tr>
                                            <th scope="col" className="font-semibold px-6 py-1">
                                                Card Number
                                            </th>
                                            <th scope="col" className="font-semibold px-6 py-1">
                                                Cardholder Name
                                            </th>
                                            <th scope="col" className="font-semibold px-6 py-1">
                                                Expiration
                                            </th>
                                            <th scope="col" className="font-semibold px-6 py-1">
                                                Activation Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((card: ICreditCardData) => (
                                            <tr
                                                className="bg-gray-100 border-1 border-b-gray-950 dark:bg-slate-950 dark:border-gray-700"
                                                key={card.card_number}
                                            >
                                                <td className="px-6 py-2">{card.card_number.replace(/\d(?=.{4,13}$)/g, '*')}</td>
                                                <td className="px-6 py-2">{card.cardholder_name}</td>
                                                <td className="px-6 py-2">{card.expiry_date}</td>
                                                <td className="px-6 py-2">
                                                    {card.verified ? (
                                                        <div className='inline'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 inline -mt-0.5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>&nbsp;&nbsp;Approved</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-wrap gap-2 my-2 justify-center">
                                                            <button onClick={() => { Activation(card.card_number) }} className="px-5 py-1.5 font-semibold bg-emerald-700 opacity-90 text-white text-md rounded-lg hover:bg-emerald-800">
                                                                <AiFillCheckCircle className="inline -mt-1 mr-2 text-2xl" />
                                                                Activate Credit Card</button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> : <div className='mt-6'>
                                    <ol className="relative border-s border-gray-200 ml-3 dark:border-gray-700">
                                        <li className="mb-10 ms-6">
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                                <AiFillInfoCircle className='inline text-blue-600 dark:text-blue-300' />
                                            </span>
                                            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                There is no record of the credit cards{" "}
                                                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                                                    Information
                                                </span>
                                            </h3>
                                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                Evidention time on {new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(/\d{1,2}(st|nd|rd|th)/, (d) => ['st', 'nd', 'rd'][parseInt(d) - 1] || 'th')}
                                            </time>
                                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                                There appears to be no indication or record suggesting that the user has entered at least one credit card into the system.
                                            </p>
                                        </li>
                                    </ol>
                                </div>
                            }
                        </div>
                        <div className="flex justify-end mt-5">
                            <button
                                onClick={() => { RefreshDataBackground(); ModalClose(); }}
                                className="bg-gray-300 text-gray-700 font-semibold px-4 py-1 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default CreditCardsPerUserModal;
