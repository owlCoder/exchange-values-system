import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import PaymentCard from '../PaymentCard/PaymentCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardSliderData from '../../interfaces/ICardSliderData';
import { AiOutlinePlus } from 'react-icons/ai';
import { GoBlocked } from 'react-icons/go';
import TopUpBalance from '../Popup/TopUpBalance/TopUpBalance';
import ICreditCardData from '../../interfaces/ICreditCardData';
import AccountsTable from '../AccountsTable/AccountsTable';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ExchangeFunds from '../Popup/ExchangeFunds/ExchangeFunds';

const CardSlider: React.FC<CardSliderData> = ({ cards }) => {
    const sliderRef = useRef<Slider>(null);
    const [index, setIndex] = useState<number>(0);
    const [topUpPopup, setTopUpPopup] = useState<JSX.Element>(<div />);
    const [exchangePopup, setExchangePopup] = useState<JSX.Element>(<div />);
    const [accountsTable, setAccountsTable] = useState<JSX.Element>(<div />);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [showAccountsTable, setShowAccountsTable] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setAccountsTable(
                <AccountsTable
                    card_number={cards[index].card_number}
                    verified={cards[index].verified}
                    refresh={refresh}
                    renderExchangeFundsPopup={renderExchangeFundsPopup}
                />
            );
            setLoading(false);
            setShowAccountsTable(true);
        }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards, index, refresh]);

    const handleRefresh = () => {
        setRefresh(refresh => !refresh);
    };

    const changeCard = (direction: string) => {
        if (sliderRef.current) {
            direction === 'left' ? sliderRef.current.slickPrev() : sliderRef.current.slickNext();
            setShowAccountsTable(false);
        }
    };

    const CustomArrow = ({ direction }: any) => (
        <div
            onClick={() => changeCard(direction)}
            className={`slick-arrow ${direction === 'left' ? 'slick-prev' : 'slick-next'}`}
        />
    );

    const renderTopUpModal = (card_number: string, uid: number | undefined): void => {
        const newTopUpPopup = card_number !== "" ? (
            <TopUpBalance
                card_number={card_number}
                uid={uid}
                closeModalMethod={() => setTopUpPopup(<div />)}
                onRefresh={() => handleRefresh()}
            />
        ) : <div />;

        setTopUpPopup(newTopUpPopup);
    };

    const renderExchangeFundsPopup = (account_id: number, balance: number, currency: string): void => {
        const newExchangePopup = account_id !== -1 ? (
            <ExchangeFunds
                account_id={account_id}
                balance={balance}
                currency={currency}
                closeModalMethod={() => setExchangePopup(<div />)}
                onRefresh={() => handleRefresh()}
            />
        ) : <div />;

        setExchangePopup(newExchangePopup);
    };

    return (
        <div className="bg-transparent min-h-screen pb-5 pt-2">
            {topUpPopup}
            {exchangePopup}
            <div className="w-full max-w-xl mx-auto">
                <Slider
                    ref={sliderRef}
                    {...{
                        dots: false,
                        infinite: true,
                        speed: 700,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        nextArrow: <CustomArrow direction="right" />,
                        prevArrow: <CustomArrow direction="left" />,
                        afterChange: (index) => {
                            setIndex(index);
                            setShowAccountsTable(false);
                        },
                    }}
                >
                    {cards.map((card: ICreditCardData, index: number) => (
                        <div key={index}>
                            <PaymentCard
                                card_number={card.card_number}
                                cardholder_name={card.cardholder_name}
                                expiry_date={card.expiry_date}
                                cvv={card.cvv}
                                uid={card.uid}
                                verified={card.verified}
                            />

                            {card.verified ? (
                                <button
                                    type="submit"
                                    className="w-1/2 mx-auto flex justify-center uppercase font-medium items-center mt-12 text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-sky-700 dark:hover:bg-sky-800 dark:focus:ring-sky-700"
                                    onClick={() => renderTopUpModal(card.card_number, card.uid)}
                                >
                                    <AiOutlinePlus className="inline mr-2 mt-1 text-xl" /> Top up the balance
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    disabled={true}
                                    className="w-1/2 mx-auto flex justify-center uppercase font-medium items-center mt-12 text-white bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-rose-700 opacity-50 dark:focus:ring-rose-800"
                                >
                                    <GoBlocked className="inline mr-2 mt-1 text-xl" /> Unverified
                                </button>
                            )}
                        </div>
                    ))}
                </Slider>
            </div>
            <div className='mt-10 pb-12 bg-gray-900 -mx-5 rounded-xl'>
                {loading ? 
                    <LoadingSpinner background='bg-transparent' minH='0' /> 
                    : showAccountsTable && <div> {accountsTable} </div>
                }
            </div>
        </div>
    );
};

export default CardSlider;
