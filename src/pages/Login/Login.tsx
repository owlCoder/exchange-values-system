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

    if (response.code === 200) {
      const { uid, token, admin } = response.payload;
      setUser({ uid: uid, token: token, admin: admin });

      // Auth user now be redirected to dashboard
      // Note: Dashboard is a page but contains more components that are shown depending on user role.
      // On, e.g., if an administrator is signed in, the dashboard will only load the administrator dashboard
      // On, e.g., if a user is signed in, the dashboard will first check if the user is verified
      // If the user is verified, then the dashboard will only load user components
      // If the user is NOT verified, then the dashboard will show an Unverified page

      // navigate('/dashboard');
    } else {
      // set error
    }
  };

  const handleLogout = () => {
    LogOut();
    setUser(null);
  };

  return (
    <main className="min-h-screen">
      {currentUser ? (
        <>
          <p>You are already logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          <div className="min-h-screen flex items-center justify-center overscroll-none">
            <div className="bg-[#0B0E13] text-white rounded-[37px] p-4 sm:p-6 md:p-20 shadow-3xl flex w-full sm:w-11/12 md:w-10/12 lg:w-7/12 xl:w-6/12">
              <div className="w-full sm:w-1/2 p-2 sm:p-12 bg-[#12181F] rounded-[37px] md:mx-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold -mb-3">Welcome back</h1>
                <p className="text-sm sm:text-md mt-2 sm:mt-4 md:mt-6 text-[#C3CDDB] ml-1">Please enter your email and <br></br>password.</p>
                <div className="space-y-2 sm:space-y-4 md:space-y-6 mt-4">
                  <div className="rounded-[20px] overflow-hidden">
                    <input
                      type="text"
                      placeholder="Email Address"
                      className="w-full h-12 sm:h-14 md:h-12 px-4 text-white placeholder-slate-500 font-regular bg-gray-800 border-0 rounded-[20px]"
                      required
                    />
                  </div>
                  <div className="rounded-[20px] overflow-hidden">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full h-12 sm:h-14 md:h-12 px-4 text-white placeholder-slate-500 font-regular bg-gray-800 border-0 rounded-[20px]"
                      required
                    />
                  </div>
                  <br></br>
                  <button
                    className="w-full h-12 sm:h-14 md:h-14 border-0 bg-[#58985B] hover:bg-[#457948] ring-0 text-white font-regular rounded-[20px] flex justify-between items-center"
                  >
                    <span className="inline ml-32 text-[16px]">Continue</span>
                    <svg className="inline float-right pr-3" width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.902344" y="0.649048" width="34.3226" height="31.55" rx="15.775" fill="white" fillOpacity="0.2" />
                      <g clipPath="url(#clip0_4_2966)">
                        <path d="M11.8689 17.4516L21.5229 17.4516L17.7529 20.8229C17.541 21.019 17.4224 21.282 17.4224 21.5558C17.4224 21.8296 17.541 22.0926 17.7529 22.2887C17.9676 22.4798 18.2572 22.587 18.5589 22.587C18.8607 22.587 19.1503 22.4798 19.3649 22.2887L25.0969 17.1505C25.3020 16.9539 25.4161 16.6943 25.4161 16.4244C25.4161 16.1546 25.3020 15.8949 25.0969 15.6983L19.3649 10.5601C19.1503 10.3690 18.8607 10.2619 18.5589 10.2619C18.2572 10.2619 17.9676 10.3690 17.7529 10.5601C17.5458 10.7546 17.4267 11.0118 17.4189 11.2813C17.4219 11.5533 17.5416 11.8137 17.7529 12.0079L21.5229 15.3927L11.8689 15.3927C11.5723 15.4006 11.2908 15.5124 11.0841 15.7043C10.8773 15.8963 10.7617 16.1533 10.7617 16.4208C10.7617 16.6883 10.8773 16.9453 11.0841 17.1373C11.2908 17.3292 11.5723 17.4410 11.8689 17.4489L11.8689 17.4516Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_2966">
                          <rect width="14.4018" height="12.3261" rx="6.16306" transform="matrix(1 1.60721e-07 1.90211e-07 -1 10.8477 22.587)" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="hidden sm:w-1/2 items-end justify-end sm:block md:mx-1">
                <div className="text-left mt-4 sm:mb-8 md:mb-12">
                  <p className="text-sm sm:text-md md:text-lg linear-text">Transactions. <br /><span className="non-linear-text">anything. anywhere.</span></p>
                </div>
                <div className="mb-4">
                  <img src="/img/lg.png" alt="Placeholder" className="object-contain w-full sm:w-10/12 h-10/12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
