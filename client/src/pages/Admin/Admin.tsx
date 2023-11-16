import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Token } from '../../service/AuthenticationService';
import Sidebar from '../../components/Navbar/Admin/Navbar';

const Administrator: React.FC = () => {
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
    
        const handleLogout = () => {
            LogOut();
            navigate("/");
        };
    
        // Check token
        Token()
            .then((isTokenValid: boolean) => {
                if (!isTokenValid) {
                    handleLogout(); // If Token returns false, log out the user
                } else {
                    const currentUserData = localStorage.getItem("currentUser");
                    if (currentUserData) {
                        const currentUser = JSON.parse(currentUserData);
                        setUser(currentUser);
    
                        if (!currentUser.admin) {
                            navigate('/');
                        }
                    } else {
                        // Handle the case where there is no user data in local storage, e.g., redirect to login
                        navigate("/");
                    }
                }
            })
            .catch(() => {
                handleLogout(); // Handle errors by logging out the user
            })
            .finally(() => {
                setLoading(false); // Set loading to false after the Token check is completed
            });
    }, []);
        
    return loading === true ? (
        <LoadingSpinner />
    ) : currentUser ? (
        <main className="bg-gray-100 dark:bg-gray-900 h-screen pb-5">
            <Sidebar />
        </main>
    ) : (
        <div></div>
    );
};

export default Administrator;
