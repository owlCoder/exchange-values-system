import { LiaSignOutAltSolid, LiaSuperpowers } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "../../service/AuthenticationService";

const LoggedIn = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      LogOut();
      navigate("/");
    };
  
    return (
      <section className="h-screen bgw">
        <div className="backdrop-blur-md flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                  className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg text-md font-semibold px-5 py-2.5 text-center dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
                  onClick={() => navigate('/dashboard')}
                >
                  Open Dashboard <LiaSuperpowers className="inline ml-1 text-xl -mt-1" />
                </button>
                <button
                  type="submit"
                  className="w-full text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400 rounded-lg text-md font-semibold px-5 py-2.5 text-center dark:bg-rose-800 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                  onClick={handleLogout} >
                  Sign Out <LiaSignOutAltSolid className="inline ml-1 text-xl -mt-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default LoggedIn;