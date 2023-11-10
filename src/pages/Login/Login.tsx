import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, LogOut } from '../../service/AuthenticationService';
import ILogin from '../../interfaces/ILogin'; // Import the ILogin interface

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData: ILogin = { email, password }; // Create the login data object
    let response = await LogIn(loginData); // Call the LogIn function with the login data

    if(response.code === 200) {
      const {uid, token, admin } = response.payload;
      setUser({uid: uid, token: token, admin: admin});

      // Auth user now be redirected to dashboard
      // Note: Dashboard is page but contains more components which are shown depend on user role.
      // On eg. if administrator signed in, dashboard will only load administrator dashboard
      // On eg. if user is signed in, dashboard will first check is user verified
      // If user is verifed then dashboard will only load user components
      // If user is NOT verified then dashboard will show Unverified page

      // navigate('/dashboard');
    }
    else {
      // set error
    }

  };

  const handleLogout = () => {
    LogOut();
    setUser(null);
  }

  return (
    <main className='min-h-screen'>
      {currentUser ? (
        <>
        <p>You are already logged in.</p>
        <button onClick={handleLogout} >Logut</button>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button> {/* Use handleLogin function */}
        </>
      )}
    </main>
  );
};

export default Login;
