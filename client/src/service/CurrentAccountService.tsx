import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../main';
import { ITopUpAccountData } from '../interfaces/TopUpAccount/ITopUpAccountData';
import { ICurrentAccount } from '../interfaces/CurrentAccount/ICurrentAccount';
import { IExchangeFundsData } from '../interfaces/ExchangeFunds/IExchangeFundsData';

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
}

export async function GetAccountsByCardNumber(card_number: string): Promise<ICurrentAccount[]> {
  try {
    const response: AxiosResponse<ICurrentAccount[]> = await axios.post(API_URL + `accounts/getAccountsByCard`, { card_number: card_number });
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function Exchange(data: IExchangeFundsData): Promise<string> {
  try {
    const response: AxiosResponse = await axios.post(API_URL + 'account/exchange', data);

    if (response.status === 201) {
      return 'OK';
    } else {
      return 'Failed to exchange currencies. Account balance won\'t be charged';
    }
  } catch (error) {
    let err = error as AxiosError;
    let errorMessage: string = err.response && err.response.data
      ? JSON.stringify(err.response.data)
      : "Failed to exchange currencies. Account balance won't be charged";

    try {
      errorMessage = JSON.parse(errorMessage).data;
    }
    catch (error) { }

    return Promise.resolve(errorMessage);
  }
}
