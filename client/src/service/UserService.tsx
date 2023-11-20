import axios, { AxiosResponse, AxiosError } from 'axios';
import IUser from '../interfaces/IUser';
import { API_URL } from '..';

/**
 * Creates a user account.
 * @param {IUser} new_user - User data to create the account.
 * @returns {Promise<string>} A Promise resolving to a status message ('Success' if successful, otherwise an error message).
 */
export function CreateUserAccount(new_user: IUser): Promise<string> {
  return axios.post(API_URL + 'user/create', new_user, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((response: AxiosResponse) => {
      if (response.status === 201) {
        return 'Success';
      } else {
        return response.data;
      }
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        const errorResponse = error.response.data as { data: string }; // Type assertion
        if (error.response.status === 400) {
          return errorResponse.data;
        } else {
          throw new Error(`User can't be created. Check entered email`);
        }
      } else if (error.request) {
        throw new Error('No response received');
      } else {
        throw new Error(`User can't be created. Check entered data`);
      }
    });
}

/**
 * Updates a user account.
 * @param {IUser} new_user - New user data to update the account.
 * @returns {Promise<string>} A Promise resolving to a status message ('Success' if successful, otherwise an error message).
 */
export function UpdateUserAccount(new_user: IUser): Promise<string> {
  return axios.put(API_URL + 'user/' + new_user.uid?.toString(), new_user, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return 'Success';
      } else {
        return response.data;
      }
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        const errorResponse = error.response.data as { data: string }; // Type assertion
        if (error.response.status === 404) {
          return errorResponse.data;
        } else {
          throw new Error(`Profile info can't be updated. Check entered email`);
        }
      } else if (error.request) {
        throw new Error('No response received');
      } else {
        throw new Error(`Profile info can't be created. Check entered data`);
      }
    });
}

/**
 * Retrieves a user account by user ID.
 * @param {number} uid - User ID to fetch the account.
 * @returns {Promise<IUser | string>} A Promise containing the user data or an error message if unsuccessful.
 */
export function GetUserAccount(uid: number): Promise<IUser | string> {
  return axios.get(API_URL + 'user/' + uid.toString(), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return response.data;
      }
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        const errorResponse = error.response.data as { data: string }; // Type assertion
        if (error.response.status === 400) {
          return errorResponse.data;
        } else {
          throw new Error(`User doesn't exist`);
        }
      } else if (error.request) {
        throw new Error('No response received');
      } else {
        throw new Error(`User doesn't exist. Check entered data`);
      }
    });
}
