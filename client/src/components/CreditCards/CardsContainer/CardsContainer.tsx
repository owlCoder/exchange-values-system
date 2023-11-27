import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { GetUsersCreditCards } from '../../../service/CreditCardsService';
import ICreditCardData from '../../../interfaces/ICreditCardData';
import CardSlider from '../../CreditCardSlider/CardSlider';

const CardsContainer: React.FC = () => {
    const { currentUser, setUser } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [cards, setCards] = useState<ICreditCardData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserCreditCards = async () => {
            try {
                if (!localStorage.getItem('currentUser')) {
                    setUser(null);
                    navigate('/');
                    return;
                }

                setLoading(true);
                if (currentUser != null) {
                    const result = await GetUsersCreditCards(currentUser.uid);
                    setCards(result);
                }
            } catch (error) {
                setCards([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserCreditCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, navigate, setUser]);

    return (
        <div className="bg-white dark:bg-gray-900 h-screen pb-5 pt-12 rounded-xl">
            {loading ? (
                <LoadingSpinner />
            ) : currentUser ? (
                <>
                    <h2 className="text-3xl font-semibold dark:text-white -mt-10 text-center mb-8 pt-6">
                        Credit Cards
                    </h2>
                    <CardSlider cards={cards} />
                </>
            ) : null}
        </div>
    );
};

export default CardsContainer;
