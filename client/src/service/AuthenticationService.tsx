import axios, { AxiosResponse } from 'axios';
import ILogin from '../interfaces/ILogin';
import ICurrentUser from '../interfaces/ICurrentUser';
import { API_URL } from '..';

/**
 * Checks the token validity and updates user verification status.
 * @returns {Promise<boolean>} A Promise resolving to a boolean value indicating the token verification success.
 */
export async function Token(): Promise<boolean> {
  try {
    const storedUser = localStorage.getItem('currentUser');

    if (!storedUser) {
      return false;
    }

    const currentUser = JSON.parse(storedUser);

    if (!currentUser || !currentUser.token || !currentUser.uid) {
      return false;
    }

    const { uid, token } = currentUser;
    const requestData = { uid, token };

    const response: AxiosResponse = await axios.post(API_URL + 'token/check', requestData, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    if (response.status === 200) {
      const newVerifiedValue = JSON.parse(response.data.data);

      const updatedUser = {
        ...currentUser,
        verified: newVerifiedValue,
      };

      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * Logs in a user with provided credentials.
 * @param {ILogin} credentials - User credentials for login.
 * @returns {Promise<ICurrentUser>} A Promise resolving to the current user's information if login is successful.
 * @throws {Error} Throws an error if login fails.
 */
export async function LogIn(credentials: ILogin): Promise<ICurrentUser> {
  try {
    const response: AxiosResponse = await axios.post(API_URL + 'auth0/', credentials, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    if (response.status === 200) {
      return response.data as ICurrentUser;
    } else {
      throw new Error(`Failed to log in: ${response.data}`);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Logs out the current user.
 * @returns {Promise<boolean>} A Promise resolving to a boolean value indicating the success of logout.
 * If no user data is found in localStorage, it returns true immediately without making an API call.
 * @throws {Error} Throws an error if there's an issue during logout process.
 */
export async function LogOut(): Promise<boolean> {
  try {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      const { uid, token } = currentUser;

      // Remove the user from localStorage
      localStorage.removeItem('currentUser');

      // Make a POST request to log the user out
      const response: AxiosResponse = await axios.post(API_URL + 'auth0/logout/', { uid, token }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      return response.status === 200;
    } else {
      // If there's no user data in localStorage, return true without making an API call
      return true;
    }
  } catch (error) {
    // Handle errors by removing user data from localStorage and rejecting the promise
    localStorage.removeItem('currentUser');
    throw error;
  }
}
