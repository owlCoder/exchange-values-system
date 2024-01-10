import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../main';
import { ITransferFundsData } from '../interfaces/TransferFunds/ITransferFundsData';

export async function Transfer(data: ITransferFundsData): Promise<string> {
  try {
    const response: AxiosResponse = await axios.post(API_URL + 'transactions/create', data);

    if (response.status === 201) {
      return "OK";
    } else {
      return "Failed to create a transaction. Account balance won't be charged";
    }
  } catch (error) {
    let err = error as AxiosError;
    let errorMessage: string = err.response && err.response.data
      ? JSON.stringify(err.response.data)
      : "Failed to create a transaction. Account balance won't be charged";

    try {
      errorMessage = JSON.parse(errorMessage).data;
    }
    catch (error) { }
    return Promise.resolve(errorMessage);
  }
}
