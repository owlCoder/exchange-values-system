import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LiaSignOutAltSolid, LiaSuperpowers } from 'react-icons/lia';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, LogOut } from '../../service/AuthenticationService';
import ICurrentUser from '../../interfaces/ICurrentUser';

const PendingVerification: React.FC = () => {
    const { currentUser, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        LogOut();
        setUser(null);
    };

    return (
        <>
            <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                    Ooops. Unverified!
                        <p className="font-light md:-pt-12 text-gray-500 md:text-lg dark:text-gray-400">Please wait for the administrator to confirm your account.</p>
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                        <button
                            type="submit"
                            className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg text-md font-semibold px-5 py-2.5 text-center dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
                            onClick={handleLogout}
                        >
                            Use another account <LiaSignOutAltSolid className="inline ml-1 text-xl -mt-1" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PendingVerification;
