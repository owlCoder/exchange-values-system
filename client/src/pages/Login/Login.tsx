import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm/LoginForm';
import LoggedIn from './LoggedIn/LoggedIn';
import LoadingSpinner from '../../components/Layout/LoadingSpinner/LoadingSpinner';

const Login: React.FC = () => {
  const { currentUser, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if(!localStorage.getItem("currentUser")) {
        setUser(null);
        navigate('/');
    }
    setLoading(false);
  }, [setUser, navigate]);

  return (
    <main>
      {loading ? <LoadingSpinner /> : currentUser ? <LoggedIn /> : <LoginForm />}
  </main>
  );
};

export default Login;
