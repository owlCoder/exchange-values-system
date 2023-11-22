import axios, { AxiosResponse } from 'axios';
import ITopUpAccountData from '../interfaces/ITopUpAccountData';
import { API_URL } from '..';
import ICurrentAccount from '../interfaces/ICurrentAccount';
import IExchangeFundsData from '../interfaces/IExchangeFundsData';

/**
 * Tops up the account balance with provided data.
 * @param {ITopUpAccountData} data - Data for topping up the account balance.
 * @returns {Promise<string>} A Promise resolving to a status message ('OK' if successful, otherwise an error message).
 */
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

/**
 * Retrieves accounts associated with a specific card number.
 * @param {string} card_number - Card number to retrieve associated accounts.
 * @returns {Promise<ICurrentAccount[]>} A Promise containing an array of current accounts or an empty array if unsuccessful.
 */
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

/**
 * Function to exchange funds between currencies.
 * @param data - Object containing details required for the funds exchange.
 * @returns Promise<string> - A Promise resolving to a string indicating the status of the exchange.
 *
 * @remarks
 * This function sends a POST request to the API endpoint to exchange funds between currencies based on the provided data.
 */
export async function Exchange(data: IExchangeFundsData): Promise<string> {
  try {
    console.log(data)
    const response: AxiosResponse = await axios.post(API_URL + 'account/exchange', data);

    // Check if the response status is successful (201 - Created)
    if (response.status === 201) {
      return 'OK'; // Exchange successful
    } else {
      return 'Failed to exchange currencies. Account balance won\'t be charged'; // Exchange failed
    }
  } catch (error) {
    console.log(error)
    return 'Error while exchanging currencies'; // Error during the exchange process
  }
}
