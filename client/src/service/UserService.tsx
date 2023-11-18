import axios, { AxiosError, AxiosResponse } from 'axios';
import IUser from '../interfaces/IUser';
import { API_URL } from '..';

export function CreateUserAccount(new_user: IUser): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      axios.post(API_URL + 'user/create', new_user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          resolve("Success");
        } else {
          resolve(response.data);
        }
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const errorResponse = error.response.data as { data: string }; // Type assertion
          if (error.response.status === 400) {
            resolve(errorResponse.data);
          } else {
            reject(`User can't be created. Check entered email`);
          }
        } else if (error.request) {
          reject('No response received');
        } else {
          reject(`User can't be created. Check entered data`);
        }
      });
    });
  }