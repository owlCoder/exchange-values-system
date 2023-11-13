import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { LogOut, Token } from "../../service/AuthenticationService";
import PendingVerification from "../../components/PendingVerification/PendingVerification";
import Verification from "../../components/Verification/Verification";
import Admin from "../../components/Admin/Admin";

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [verified, setVerified] = useState(false);
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            LogOut();
            navigate("/login");
        };

        // Check token
        Token()
            .then((isTokenValid: boolean) => {
                if (!isTokenValid) {
                    handleLogout(); // If Token returns false, log out the user
                }
            })
            .catch(() => {
                handleLogout(); // Handle errors by logging out the user
            });

        const currentUserData = localStorage.getItem("currentUser");
        if (currentUserData) {
            const currentUser = JSON.parse(currentUserData);

            if (currentUser.admin) {
                setIsAdmin(true);
            } else {
                // Check is user verified
                if(currentUser.verified) {
                    setVerified(true);
                }
                else {
                    // check if user added a card info and waiting for verification
                    // call api and check cards table for card with uid
                    const response = false;
                    //// TODO

                    if(response) { // user has been added card info but admin not yet verified it
                        setPending(true);
                        setVerified(false);
                    }
                    else { // show add card info page
                        setPending(false);
                        setVerified(false);
                    }
                }
            }
        } else {
            // Handle the case where there is no user data in local storage, e.g., redirect to login
            navigate("/login");
        }

        setLoading(false);
    }, [navigate]);

    return (
        <main>
            {loading ? (
                <p>Loading...</p>
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
                        {isAdmin ? (
                            <Admin />
                        ) : pending && !verified ? (
                            <PendingVerification />
                        ) : !pending && !verified ? (
                            <Verification />
                        ) : (
                            <></>
                        )}
                    </div>
                </section>
            )}
        </main>
    );
};

export default Dashboard;
