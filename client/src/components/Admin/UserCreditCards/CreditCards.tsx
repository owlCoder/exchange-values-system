import React, { useState } from 'react';
import ICreditCardModal from '../../../interfaces/ICreditCardModal';

const CreditCards: React.FC<ICreditCardModal> = ({ uid, setModal }) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
                <div className="bg-white dark:bg-gray-900 w-96 rounded-lg p-6 shadow-lg transition-opacity duration-300">
                    <h2 className="text-xl font-semibold text-red-600 dark:text-red-700 mb-4">
                        Delete Account
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete user account? This action cannot
                        be undone.
                    </p>
                    <div className="flex justify-end mt-5">
                        <button
                            className="bg-red-500 dark:bg-rose-700 text-white font-semibold px-4 py-2 rounded mr-4 hover:bg-rose-800"
                        >
                            I agree to delete account
                        </button>
                        <button
                            onClick={() => setModal(<div></div>)}
                            className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreditCards;
