import axios, { AxiosResponse } from 'axios';
import ITopUpAccountData from '../interfaces/ITopUpAccountData';
import { API_URL } from '..';

export async function TopUp(data: ITopUpAccountData): Promise<string> {
  try {
    const response: AxiosResponse = await axios.post(API_URL + 'account/topup', data);
    if (response.status === 201) {
      return 'OK';
    } else {
      return 'Failed to top up account balance';
    }
  } catch (error) {
    return 'Error while topping up account balance';
  }
};
