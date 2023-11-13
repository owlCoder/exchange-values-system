import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineLogin } from "react-icons/ai";
import { LiaSignOutAltSolid, LiaSuperpowers } from 'react-icons/lia';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, LogOut } from '../../service/AuthenticationService';
import ILogin from '../../interfaces/ILogin';
import ICurrentUser from '../../interfaces/ICurrentUser';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { currentUser, setUser } = useAuth();
  const navigate = useNavigate();

  const isICurrentUser = (obj: any): obj is ICurrentUser => (
    typeof obj === 'object' &&
    'uid' in obj &&
    'token' in obj &&
    'admin' in obj &&
    'verified' in obj
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true); // Start loading

    try {
      const loginData: ILogin = { email, password };
      const response = await LogIn(loginData);

      if (isICurrentUser(response)) {
        setUser(response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      } else {
        setError('Check entered data and try again');
      }
    } catch (error) {
      setError('Check entered data and try again');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLogout = () => {
    LogOut();
    setUser(null);
  };

  return (
    <main>
      {currentUser ? (
        <>
        <section className="h-screen bgw">
        <div className=" backdrop-blur-md flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
            <img className="w-8 h-8 mr-2" src="logo512.png" alt="logo" />
            Transaction Systems
          </Link>
          <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                Welcome back
                <p className="font-light md:-pt-12 text-gray-500 md:text-lg dark:text-gray-400">You're already in.</p>
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <h4 className="text-emerald-700 dark:text-emerald-500 -my-2 text-center">You have been already logged in.</h4>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-lg text-md font-semibold px-5 py-2.5 text-center dark:bg-sky-600 dark:hover-bg-sky-700 dark:focus:ring-sky-800"
                  onClick={() => navigate('/dashboard')}
                >
                  Open Dashboard <LiaSuperpowers className="inline ml-1 text-xl -mt-1" />
                </button>
                <button
                  type="submit"
                  className="w-full text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400 rounded-lg text-md font-semibold px-5 py-2.5 text-center dark:bg-rose-800 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                  onClick={handleLogout}
                >
                  Sign Out <LiaSignOutAltSolid className="inline ml-1 text-xl -mt-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
      ) : (
        // Login form
        <section className="h-screen bgw">
          <div className=" backdrop-blur-md flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
              <img className="w-8 h-8 mr-2" src="logo512.png" alt="logo" />
              Transaction Systems
            </Link>
            <form onSubmit={handleLogin} className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                  Welcome back
                  <p className="font-light md:-pt-12 text-gray-500 md:text-lg dark:text-gray-400">Please enter your email and password.</p>
                </h1>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-sky-400 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="user@tsystems.com"
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-sky-400 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    autoComplete='on'
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </div>
                <div>
                  <h4 className="text-red-700 dark:text-red-500 -my-2 text-center">{error}</h4>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-lg text-md font-semibold px-5 py-2.5 text-center dark:bg-sky-600 dark:hover-bg-sky-700 dark:focus:ring-sky-800"
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? 'Logging in...' : 'Continue'} <AiOutlineLogin className="inline ml-1 text-xl -mt-1" />
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </main>
  );
};

export default Login;
