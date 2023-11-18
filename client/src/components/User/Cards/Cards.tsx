import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const Cards: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { currentUser, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            setUser(null);
            navigate('/');
            return; // Exit early if there's no user data
        }

        setLoading(true);
        
        

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading === true ? (
        <LoadingSpinner />
    ) : currentUser ? (
        <main className="bg-gray-100 dark:bg-gray-900 h-screen pb-5">
            <>
                
            </>

        </main>
    ) : (
        <div></div>
    );
};

export default Cards;
