import React, { useRef } from 'react';
import Slider from 'react-slick';
import ICreditCardData from '../../interfaces/ICreditCardData';
import PaymentCard from '../PaymentCard/PaymentCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CardSliderData {
    cards: ICreditCardData[];
}

const CardSlider: React.FC<CardSliderData> = ({ cards }) => {
    const sliderRef = useRef<Slider>(null);

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

    return (
        <main className="bg-gray-100 dark:bg-gray-900 h-screen pb-5 pt-2">
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
                    }}
                >
                    {cards.map((card: ICreditCardData, index: number) => (
                        <div>
                            <PaymentCard
                                card_number={card.card_number}
                                cardholder_name={card.cardholder_name}
                                expiry_date={card.expiry_date}
                                cvv={card.cvv}
                                uid={index}
                                verified={card.verified} />
                        </div>
                    ))}
                </Slider>
            </div>
        </main>
    );
};

export default CardSlider;
