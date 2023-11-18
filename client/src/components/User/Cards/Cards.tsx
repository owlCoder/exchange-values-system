import React, { useEffect, useState, useRef } from 'react';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { GetUsersCreditCards } from '../../../service/CreditCardsService';
import ICreditCardData from '../../../interfaces/ICreditCardData';
import CardSlider from '../../CreditCardSlider/CardSlider';

const Cards: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { currentUser, setUser } = useAuth();
    const [data, setData] = useState<ICreditCardData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('currentUser')) {
            setUser(null);
            navigate('/');
            return;
        }

        setLoading(true);
        if (currentUser != null) {
            GetUsersCreditCards(currentUser.uid)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
        <LoadingSpinner />
    ) : currentUser ? (
        <main className="bg-white dark:bg-gray-900 h-screen pb-5 pt-12 rounded-xl">
            <h2 className="text-3xl font-semibold dark:text-white -mt-10 text-center mb-8 pt-6">
                Credit Cards
            </h2>
            {/* slider goes here */}
            <CardSlider cards={data} />

            {/* all invoices goes here - connected by credit card */}
        </main>
    ) : (
        <div></div>
    );
};

export default Cards;
