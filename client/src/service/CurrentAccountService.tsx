import axios, { AxiosResponse } from 'axios';
import ITopUpAccountData from '../interfaces/ITopUpAccountData';
import { API_URL } from '..';
import ICurrentAccount from '../interfaces/ICurrentAccount';

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
