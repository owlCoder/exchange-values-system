import React, { useState } from "react";
import { LogOut } from "../../service/AuthenticationService";
import { useNavigate } from "react-router-dom";

const NavigationHeader: React.FC = () => {
    const navigate = useNavigate();
    const [RenderComponent, setRenderComponent] = useState<"transactions" | "users" | "create">("transactions");

    const renderActiveComponent = () => {
        if (RenderComponent === "transactions")
          return <h1 className="text-white">1</h1>;
        else if(RenderComponent === "users")
            return <h1>2</h1>;
        else
          return <h1>3</h1>;;
      };

    const SignOut = () => {
        LogOut();
        navigate("/");
    };

    // to do proveri current user ili primi rolu i promeni sta pise ovako i tjt
    // npr if admin onda button menja na users

    return (
        <main className="bg-gray-900">
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
                                Transaction Systems
                            </span>
                        </a>
                        <div className="flex items-center lg:order-2">

                            <button
                                onClick={SignOut}
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                            >
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
                                        onClick={() => setRenderComponent("transactions")}
                                        className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                        aria-current="page"
                                    >
                                        Transactions
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setRenderComponent("users")}
                                        className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Users
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setRenderComponent("create")}
                                        className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        User Registration
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
            <div className="bg-gray-100 dark:bg-slate-800 py-1 h-screen">
                <div className="bg-gray-100 dark:bg-gray-900 m-5 rounded-lg p-5">
                    {renderActiveComponent()}
                </div>
            </div>
        </main>
    );
};

export default NavigationHeader;
