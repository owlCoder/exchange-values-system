import React from 'react';
import IInfoModal from '../../../interfaces/PopUp/IInfoModal';

const Info: React.FC<IInfoModal> = ({ title, closeModalMethod }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl backdrop-filter dark:backdrop-blur-md dark:backdrop-filter">
            <div className="bg-transparent w-96 rounded-lg p-6 transition-opacity duration-300">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">{title}</span>
                    </div>
                    <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</p>
                    <button
                        onClick={() => closeModalMethod(false)}
                        type="button"
                        className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Info;
