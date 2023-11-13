import axios, { AxiosResponse } from 'axios';
import ILogin from '../interfaces/ILogin';
import ICurrentUser from '../interfaces/ICurrentUser';
import { API_URL } from '..';

export function Token(): Promise<boolean> {
  return new Promise<boolean>(async (resolve, reject) => {
    const storedUser = localStorage.getItem('currentUser');

    if (!storedUser) {
      resolve(false);
      return;
    }

    const currentUser = JSON.parse(storedUser);

    if (!currentUser || !currentUser.token || !currentUser.uid) {
      resolve(false);
      return;
    }

    const { uid, token } = currentUser;
    const requestData = { uid, token };

    try {
      const response: AxiosResponse = await axios.post(API_URL + 'token/check/', requestData, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      if (response.status === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      resolve(false);
      console.error('Error checking token:', error);
    }
  });
}

export function LogIn(credentials: ILogin): Promise<ICurrentUser> {
  return new Promise<ICurrentUser>(async (resolve, reject) => {
    try {
      const response: AxiosResponse = await axios.post(API_URL + 'auth0/', credentials, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      if (response.status === 200) {
        resolve(response.data as ICurrentUser);
      } else {
        reject({ message: response.data });
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function LogOut(): Promise<boolean> {
  return new Promise<boolean>(async (resolve, reject) => {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      const { uid, token } = currentUser;

      try {
        // Make a POST request to your Flask API to log the user out
        const response: AxiosResponse = await axios.post(API_URL + 'auth0/logout/', { uid, token }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        });

        // Remove the user from localStorage
        localStorage.removeItem('currentUser');

        if (response.status === 200) {
          resolve(true);
        } else {
          reject({ message: response.data });
        }
      } catch (error) {
        // Handle API request errors
        console.error('Error logging out:', error);
        reject(error);
      }
    } else {
      // If there's no user data in localStorage, no need to call the API
      // Just clear the session on the client
      localStorage.removeItem('currentUser');
      resolve(true); // You can return true even if there's no user data to remove
    }
  });
}