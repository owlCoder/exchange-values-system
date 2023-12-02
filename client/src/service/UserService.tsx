import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_URL } from '../main';
import IUser from '../interfaces/Auth/IUser';

export async function CreateUserAccount(new_user: IUser): Promise<string> {
  try {
    const response = await axios.post(API_URL + 'user/create', new_user, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } });

    return response.status === 201 ? 'Success' : response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorResponse = error.response.data as { data: string };
        throw new Error(error.response.status === 400 ? errorResponse.data : `User can't be created`);
      } else if (error.request) {
        throw new Error('No response received');
      }
    }

    throw new Error(`User can't be created. Check entered data`);
  }
}

export async function UpdateUserAccount(new_user: IUser): Promise<string> {
  try {
    const response = await axios.put(API_URL + 'user/' + new_user.uid?.toString(), new_user, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } });

    return response.status === 200 ? 'Success' : response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorResponse = error.response.data as { data: string };
        throw new Error(error.response.status === 404 ? errorResponse.data : `Profile info can't be updated`);
      } else if (error.request) {
        throw new Error('No response received');
      }
    }

    throw new Error(`Profile info can't be updated. Check entered data`);
  }
}

export async function GetUserAccount(uid: number): Promise<IUser | string> {
  try {
    const response = await axios.get(API_URL + 'user/' + uid.toString(), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } });

    return response.status === 200 ? response.data : response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorResponse = error.response.data as { data: string };
        throw new Error(error.response.status === 400 ? errorResponse.data : `User doesn't exist`);
      } else if (error.request) {
        throw new Error('No response received');
      }
    }

    throw new Error(`User doesn't exist. Check entered data`);
  }
}

export async function GetAllUsers(): Promise<IUser[]> {
  try {
    const response = await axios.get<IUser[]>(API_URL + 'users', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};