import axios, { AxiosResponse } from 'axios';
import ILogin from '../interfaces/ILogin';
import ICurrentUser from '../interfaces/ICurrentUser';
import { API_URL } from '../main';

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

export async function LogOut(): Promise<boolean> {
  try {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      const { uid, token } = currentUser;

      localStorage.removeItem('currentUser');

      const response: AxiosResponse = await axios.post(API_URL + 'auth0/logout/', { uid, token }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      return response.status === 200;
    } else {
      return true;
    }
  } catch (error) {
    localStorage.removeItem('currentUser');
    throw error;
  }
}
