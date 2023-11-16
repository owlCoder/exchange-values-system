import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Token } from "../../service/AuthenticationService";
import PendingVerification from "../../components/PendingVerification/PendingVerification";
import Verification from "../../components/Verification/Verification";
import Admin from "../../components/Admin/Admin";
import User from "../../components/User/User";
import { IsExistCreditCardPerUser } from "../../service/CreditCardsService";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [verified, setVerified] = useState(false);
    const [pending, setPending] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("currentUser")) {
            setUser(null);
            navigate('/');
        }

        setLoading(true);

        const handleLogout = () => {
            LogOut();
            navigate("/");
        };

        // Check token
        Token()
            .then((isTokenValid: boolean) => {
                if (!isTokenValid) {
                    handleLogout(); // If Token returns false, log out the user
                }
                else {
                    const currentUserData = localStorage.getItem("currentUser");
                    if (currentUserData) {
                        const currentUser = JSON.parse(currentUserData);

                        if (currentUser.admin) {
                            setIsAdmin(true);
                            setLoading(false);
                        } else {
                            if (currentUser.verified) { // Check is user verified
                                setVerified(true);
                            }
                            else {
                                // check if user added a card info and waiting for verification
                                // call api and check cards table for card with uid
                                IsExistCreditCardPerUser(currentUser.uid)
                                    .then(response => {
                                        if (response === 'Success') {
                                            setPending(true);
                                            setVerified(false);
                                        } else {
                                            setPending(false);
                                            setVerified(false);
                                        }

                                        setLoading(false)
                                    })
                                    .catch((error) => {
                                        setPending(false);
                                        setVerified(false);
                                        setLoading(false);
                                    });
                            }
                        }
                    } else {
                        // Handle the case where there is no user data in local storage, e.g., redirect to login
                        navigate("/");
                    }
                }
            })
            .catch(() => {
                handleLogout(); // Handle errors by logging out the user
            });
    }, [setUser, navigate]);

    return (
        <main>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <section className="h-screen bgw">
                    <div className="backdrop-blur-md flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link
                            to="/"
                            className="flex items-center mb-6 text-2xl font-semibold text-white dark-text-white"
                        >
                            <img className="w-8 h-8 mr-2" src="logo512.png" alt="logo" />
                            Transaction Systems
                        </Link>
                        {isAdmin ?
                            <Admin />
                            : verified ? <User />
                                : !verified && pending ? <PendingVerification />
                                    : !verified ? <Verification />
                                        : <></>
                        }
                    </div>
                </section>
            )}
        </main>
    );
};

export default Dashboard;
