import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn } from '../../service/AuthenticationService';
import ILogin from '../../interfaces/ILogin'; // Import the ILogin interface

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const loginData: ILogin = { email, password }; // Create the login data object
    let response = LogIn(loginData); // Call the LogIn function with the login data
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>You are already logged in.</p>
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
    </div>
  );
};

export default Login;
