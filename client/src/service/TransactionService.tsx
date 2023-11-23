import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '..';
import ITransferFundsData from '../interfaces/ITransferFundsData';

/**
 * Initiates a transfer of funds from the sender to the receiver.
 * @param data - An object containing transfer details.
 * @returns A Promise resolving to a string indicating the transfer status.
 */
export async function Transfer(data: ITransferFundsData): Promise<string> {
    console.table(data)
    try {
      const response: AxiosResponse = await axios.post(API_URL + 'transactions/create', data);
  
      // Check if the response status is successful (201 - Created)
      if (response.status === 201) {
        return "OK";
      } else {
        return "Failed to create a transaction. Account balance won't be charged"; // Exchange failed
      }
    } catch (error) {
      let err = error as AxiosError;
      let errorMessage: string = err.response && err.response.data
        ? JSON.stringify(err.response.data)
        : "Failed to create a transaction. Account balance won't be charged";
  
      try {
        errorMessage = JSON.parse(errorMessage).data;
      }
      catch(error) { }
        return Promise.resolve(errorMessage); // Reject with the error message
    }
  }
  