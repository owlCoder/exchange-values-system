import axios, { AxiosResponse } from 'axios';
import IUser from '../interfaces/IUser';
import { API_URL } from '..';

export function CreateUserAccount(new_user: IUser): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const response: AxiosResponse = await axios.post(API_URL + 'user/create', new_user, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        });

        if (response.status === 200) {
          resolve("Success");
        } else {
          reject(response.data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }