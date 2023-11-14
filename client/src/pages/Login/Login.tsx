import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import LoggedIn from './LoggedIn';

const Login: React.FC = () => {
  const { currentUser, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("currentUser")) {
        setUser(null);
        navigate('/');
    }
  }, [setUser, navigate]);

  return (
    <main>
      {currentUser ? <LoggedIn /> : <LoginForm />}
  </main>
  );
};

export default Login;
