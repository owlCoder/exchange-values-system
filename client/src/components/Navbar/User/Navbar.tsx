import React, { useState } from "react";
import { LogOut } from "../../../service/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import Cards from "../../User/Cards/Cards";
import CreditCardForm from "../../CreditCard/CreditCardForm";
import Info from "../../Popup/Informative/Info";
import Profile from "../../User/Profile/Profile";

const NavigationHeader: React.FC = () => {
    const [infoModal, setInfoModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const [RenderComponent, setRenderComponent] =
        useState<"cards" | "profile" | 'add-card'>("cards");

    const renderActiveComponent = (): JSX.Element => {
        if (RenderComponent === "cards") return <Cards />
        else if (RenderComponent === "profile") return <Profile />;
        else return <div className="w-5/6 mb-4 mx-auto bg-white rounded-2xl shadow dark:border md:mt-4 xl:p-0 dark:bg-gray-800 dark:border-gray-900">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                    Add new credit card
                    <p className="font-light md:-pt-12 text-gray-500 md:text-lg dark:text-gray-400">Add new card to your account entering credit card details.</p>
                </h1>
                <div className="space-y-4 md:space-y-6">
                    <CreditCardForm />
                </div>
            </div>
        </div>;
    };

    const SignOut = () => {
        LogOut();
        navigate("/");
    };

    return (
        <main className="bg-gray-900">
            {infoModal && <Info title='Credit card has been added successfully' closeModalMethod={setInfoModal} />}
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-3 dark:bg-gray-900">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="/" className="flex items-center">
                            <img
                                src="logo512.png"
                                className="mr-3 h-6 sm:h-9"
                                alt=" Logo"
                            />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Transactions System
                            </span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <button
                                onClick={SignOut}
                                className="text-white bg-[#8E0000] hover:bg-[#A43232] focus:ring-4 focus:ring-[#8E0000] font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2 mr-2 dark:bg-[#8E0000] dark:hover:bg-[#A43232] focus:outline-none dark:focus:ring-[#8E0000]"
                            >
                                <AiOutlineLogout className="inline -mt-1 mr-2 text-2xl" />
                                Sign Out
                            </button>
                        </div>
                        <div
                            className="hidden w-full lg:flex lg:w-auto lg:order-1"
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <button
                                        onClick={() => setRenderComponent("profile")}
                                        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-sky-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                        aria-current="page"
                                    >
                                        Edit Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setRenderComponent("cards")}
                                        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-sky-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Credit  Cards
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setRenderComponent("add-card")}
                                        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-sky-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Add new credit card
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden w-full lg:flex lg:w-auto lg:order-1"></div>
                        <div className="hidden w-full lg:flex lg:w-auto lg:order-1"></div>
                        <div className="hidden w-full lg:flex lg:w-auto lg:order-1"></div>
                        <div className="hidden w-full lg:flex lg:w-auto lg:order-1"></div>
                        <div className="hidden w-full lg:flex lg:w-auto lg:order-1"></div>
                        <div className="hidden w-full lg:flex lg:w-auto lg:order-1"></div>
                    </div>
                </nav>
            </header>
            <div className="bg-gray-100 dark:bg-slate-800 py-1 min-h-screen">
                <div className="bg-gray-100 dark:bg-gray-900 m-5 rounded-lg p-5">
                    {renderActiveComponent()}
                </div>
            </div>
        </main>
    );
};

export default NavigationHeader;
