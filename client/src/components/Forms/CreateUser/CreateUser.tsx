import React, { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import IUser from '../../../interfaces/Auth/IUser';
import { CreateUserAccount } from '../../../service/UserService';
import Info from '../../PopUps/Informative/Info';

const CreateUser: React.FC = () => {
  const [error, setError] = useState<string>('');
  const initialFormData: IUser = {
    first_name: '',
    surname: '',
    address: '',
    city: '',
    country: '',
    phone_number: '',
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState<IUser>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle new user data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Call service to create new user account
    CreateUserAccount(formData)
      .then((response: string) => {
        if (response === 'Success') {
          setInfoModal(true);
          setFormData(initialFormData);
        }
        else
          setError(response)
      })
      .catch((error: string) => {
        setError(error.toString());
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <div>
      {infoModal && <Info title='User has been created successfully' closeModalMethod={setInfoModal} />}
      <div className="overflow-y-auto h-screen overflow-x-hidden justify-center items-center w-full md:inset-0 md:h-full">
        <div className="relative p-4 w-full h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Create a new user account
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-x-10 gap-y-3 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoFocus
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type user first name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="surname"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type user last name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type user address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type user city"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type user country"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type user phone number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type user email"
                    required
                  />
                </div>
                <div className='mb-5'>
                  <label
                    htmlFor="password"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    minLength={6}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type user password"
                    required
                  />
                </div>
              </div>
              <div className='my-5'>
                <h4 className="text-red-700 dark:text-red-500 -mt-4 mb-4 text-lg">{error}</h4>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="text-white inline-flex items-center text-md bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <AiOutlineUserAdd className='inline mr-2 text-lg' />
                {loading ? 'Creating account...' : 'Create account'}
              </button>
              <div className='ml-5 inline'>
                <button
                  type="reset"
                  disabled={loading}
                  onClick={() => { setFormData(initialFormData); setError(''); }}
                  className="text-white inline-flex items-center bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg px-5 py-2 text-center dark:bg-rose-700 dark:hover:bg-rose-800 dark:focus:ring-red-800"
                >
                  <MdClear className='inline mr-2 text-lg' />
                  Clear fields
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
