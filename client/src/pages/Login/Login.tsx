import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineLogin } from "react-icons/ai";
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, LogOut } from '../../service/AuthenticationService';
import ILogin from '../../interfaces/ILogin'; // Import the ILogin interface

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(email === "" || password === "") {
      setError("Enter credetials");
      return;
    }
    
    const loginData: ILogin = { email, password }; // Create the login data object
    let response = await LogIn(loginData); // Call the LogIn function with the login data
console.log(response)
    // if (response.status === 200) {
    //   const { uid, token, admin } = response.payload;
    //   setUser({ uid: uid, token: token, admin: admin });

      // Auth user now be redirected to dashboard
      // Note: Dashboard is a page but contains more components that are shown depending on user role.
      // On, e.g., if an administrator is signed in, the dashboard will only load the administrator dashboard
      // On, e.g., if a user is signed in, the dashboard will first check if the user is verified
      // If the user is verified, then the dashboard will only load user components
      // If the user is NOT verified, then the dashboard will show an Unverified page

      // navigate('/dashboard');
    // } else {
    //   // set error
    // }
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
                  <p className="font-light md:-pt-12 text-gray-500 md:text-lg dark:text-gray-400">Please enter your email and password.</p>
                </h1>
                <form className="space-y-4 md:space-y-6">
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
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </div>
                  <div>
                    <h4 className="text-red-700 dark:text-red-500 -my-2 text-center">{error}</h4>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-lg text-md font-semibold px-5 py-2.5 text-center dark:bg-sky-600 dark:hover-bg-sky-700 dark:focus:ring-sky-800"
                    onClick={handleLogin}
                  >
                    Continue <AiOutlineLogin className="inline ml-1 text-xl -mt-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Login;
