import React, { useEffect, useState } from 'react';
import ICreditCardModal from '../../../interfaces/ICreditCardModal';
import ICreditCardData from '../../../interfaces/ICreditCardData';
import axios from 'axios';
import { API_URL } from '../../..';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { AiFillCreditCard } from 'react-icons/ai';

const CreditCards: React.FC<ICreditCardModal> = ({ uid, setModal }) => {
    const [data, setData] = useState<ICreditCardData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await axios.post<ICreditCardData[]>(API_URL + 'cards/getCardsByUid', { uid: uid }, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                });
                setData(response.data);
            } catch (error) {
                setData([]);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [uid]);

    function VerifyCard(uid: number | undefined) {
        throw new Error('Function not implemented.');
    }

    return (
        <>
        {loading ? 
            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
                <LoadingSpinner background='bg-transparent' />
            </div> 
            :
            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
                <div className="bg-white dark:bg-gray-900 w-3/4 rounded-lg p-6 shadow-lg transition-opacity duration-300">
                    <h2 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-700 mb-4">
                        Credit Cards
                    </h2>
                        <div>
                            {data.length !== 0 ?
                                <table className="w-full text-md text-left text-black dark:text-white">
                                    <thead className="text-lg text-white bg-sky-700">
                                        <tr>
                                            <th scope="col font-semibold" className="px-6 py-1">
                                                Card Number
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                Cardholder Name
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                Expiration
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                Activation Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((card: ICreditCardData) => (
                                            <tr
                                                className="bg-white border-1 border-b-gray-950 dark:bg-slate-950 dark:border-gray-700"
                                                key={card.card_number}
                                            >
                                                
                                                <td className="px-6 py-4">{card.card_number.replace(/\d(?=.{4,13}$)/g, '*')}</td>
                                                <td className="px-6 py-4">{card.cardholder_name}</td>
                                                <td className="px-6 py-4">{card.expiry_date}</td>
                                                <td className="px-6 py-4">
                                                    {card.verified ? (
                                                        <div className='inline'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 inline -mt-0.5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>&nbsp;&nbsp;Approved</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-wrap gap-2 mt-4">
                                                            <button onClick={() => { VerifyCard(card.uid) }} className="px-5 py-1.5 bg-sky-700 text-white text-md rounded-lg hover:bg-sky-800">
                                                                <AiFillCreditCard className="inline -mt-1 mr-2 text-2xl" />
                                                                View Credit Cards Details</button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> : <></>
                            }
                        </div>
                    <div className="flex justify-end mt-5">
                        <button
                            onClick={() => setModal(<div></div>)}
                            className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-400"
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

export default CreditCards;
