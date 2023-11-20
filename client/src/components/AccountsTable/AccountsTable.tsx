import React, { useEffect, useState } from 'react';
import IAccountsTableData from '../../interfaces/IAccountsTableData';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { TbTransferVertical } from 'react-icons/tb';
import { AiOutlineTransaction } from 'react-icons/ai';
import ICurrentAccount from '../../interfaces/ICurrentAccount';
import { GetAccountsByCardNumber } from '../../service/CurrentAccountService';

const AccountsTable: React.FC<IAccountsTableData> = ({ card_number, verified, refresh }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<ICurrentAccount[]>([]);

    useEffect(() => {
        setLoading(true);
        const GetAccountsData = async () => {
            try {
                const data = await GetAccountsByCardNumber(card_number);
                setAccounts(data);
            } catch (error) {
                setAccounts([]);
            }
            finally {
                setLoading(false);
            }
        };

        GetAccountsData();
    }, [card_number, refresh]);

    return (
        <div>
            {loading ? <LoadingSpinner background='bg-transparent' minH='0' /> :
                accounts.length === 0 ?
                    <div className='mx-auto text-md text-left text-black dark:text-white rounded-lg overflow-hidden w-3/5'>
                        {verified ? <h1 className="border border-sky-700  bg-sky-700 p-2 rounded-xl w-full text-lg font-semibold text-center text-white dark:text-white">
                            There are no current accounts to display at the moment. Use TOP UP BALANCE option to create a new account.
                        </h1> :
                        <h1 className="border border-rose-800  bg-rose-800 p-2 rounded-xl w-full text-lg font-semibold text-center text-white dark:text-white">
                        Credit card isn't accepted by an administrator.
                    </h1>}
                    </div> :
                    <table className="mx-auto text-md text-left text-black dark:text-white rounded-lg overflow-hidden w-3/5">
                        <thead className="text-lg text-white bg-sky-800">
                            <tr>
                                <th scope="col font-semibold" className="font-semibold px-6 py-1">
                                    Account Number
                                </th>
                                <th scope="col" className="font-semibold px-10 py-1">
                                    Balance
                                </th>
                                <th scope="col" className="font-semibold px-4 py-1">
                                    Currency
                                </th>
                                <th scope="col" className="font-semibold px-8 py-1">
                                    Account Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account: ICurrentAccount, index: number) => (
                                <tr key={index}
                                    className="bg-white border-1 border-b-gray-950 dark:bg-slate-950 dark:border-gray-700"
                                >
                                    <td className="px-10 py-2">{account.account_number}</td>
                                    <td className="px-10 py-2">{account.balance}</td>
                                    <td className="px-4 py-2">{account.currency}</td>
                                    <td className='px-8 py-2 flex space-x-6'>
                                        <div className="flex flex-wrap my-2">
                                            <button onClick={() => { console.log(account.account_id) }} className="px-5 py-1.5 bg-[#124191] text-white text-md rounded-lg hover:bg-blue-900">
                                                <AiOutlineTransaction className="inline -mt-1 mr-2 text-2xl" />
                                                Exchange Funds</button>
                                        </div>
                                        <div className="flex flex-wrap my-2">
                                            <button onClick={() => { }} className="px-5 py-1.5 bg-orange-800 text-white text-md rounded-lg hover:bg-orange-900">
                                                <TbTransferVertical className="inline -mt-1 mr-2 text-2xl" />
                                                Transfer Funds</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default AccountsTable;
