import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import PaymentCard from '../PaymentCard/PaymentCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardSliderData from '../../interfaces/ICardSliderData';
import { AiOutlinePlus, AiOutlineTransaction } from 'react-icons/ai';
import { TbTransferVertical } from 'react-icons/tb';
import { GoBlocked } from 'react-icons/go';
import TopUpBalance from '../Popup/TopUpBalance/TopUpBalance';
import ICreditCardData from '../../interfaces/ICreditCardData';
import AccountsTable from '../AccountsTable/AccountsTable';

const CardSlider: React.FC<CardSliderData> = ({ cards }) => {
    const sliderRef = useRef<Slider>(null);
    const [topUpPopup, setTopUpPopup] = useState<JSX.Element>(<div></div>);
    const [accountsTable, setAccountsTable] = useState<JSX.Element>(cards.length > 0 ?
        <AccountsTable card_number={cards[0].card_number} /> : <div></div>);

    const changeCard = (direction: string) => {
        if (sliderRef.current) {
            if (direction === 'left') {
                sliderRef.current.slickPrev();
            } else if (direction === 'right') {
                sliderRef.current.slickNext();
            }
        }
    };

    const CustomArrow = ({ direction }: any) => {
        return (
            <div
                onClick={() => changeCard(direction)}
                className={`slick-arrow ${direction === 'left' ? 'slick-prev' : 'slick-next'}`}
            >
            </div>
        );
    };

    function RenderTopUpModal(card_number: string, uid: number | undefined): void {
        if (card_number === "") setTopUpPopup(<div></div>)
        else setTopUpPopup(<TopUpBalance card_number={card_number} uid={uid} closeModalMethod={setTopUpPopup} />)
    }

    function setAccountsData(index: number) {
        setAccountsTable(<AccountsTable card_number={cards[index].card_number} />)
    }

    return (
        <div className="bg-transparent min-h-screen pb-5 pt-2">
            {topUpPopup}
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
                            setAccountsData(index);
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
                                verified={card.verified} />

                            {card.verified ?
                                <button
                                    type="submit"
                                    className="w-1/2 mx-auto flex justify-center uppercase font-medium items-center mt-12 text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-sky-700 dark:hover:bg-sky-800 dark:focus:ring-sky-800"
                                    onClick={() => RenderTopUpModal(card.card_number, card.uid)}
                                >
                                    <AiOutlinePlus className="inline mr-2 mt-1 text-xl" /> Top up the balance
                                </button> :
                                <button
                                    type="button"
                                    disabled={true}
                                    className="w-1/2 mx-auto flex justify-center uppercase font-medium items-center mt-12 text-white bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-rose-700 opacity-50 dark:focus:ring-rose-800"
                                >
                                    <GoBlocked className="inline mr-2 mt-1 text-xl" /> Unverified
                                </button>
                            }
                        </div>
                    ))}
                </Slider>
            </div>

            <div className='mt-10 pb-12 bg-gray-900 -mx-5 rounded-xl'>
                {accountsTable}
            </div>

        </div>
    );
};

export default CardSlider;
