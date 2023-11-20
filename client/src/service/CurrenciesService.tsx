import axios from 'axios';
import { API_URL } from '..';
import ICurrency from '../interfaces/ICurrency';

/**
 * Retrieves currency codes.
 * @returns {Promise<string[] | []>} A Promise containing an array of currency codes or an empty array if unsuccessful.
 */
export async function GetCurrencyCodes(): Promise<string[] | []> {
  try {
    const response = await axios.get(API_URL + 'currencies');

    if (response.status === 200) {
      return response.data as string[];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

/**
 * Retrieves currency courses.
 * @returns {Promise<ICurrency | []>} A Promise containing currency course data or an empty array if unsuccessful.
 */
export async function GetCurrenciesCourses(): Promise<ICurrency | []> {
  try {
    const response = await axios.get(API_URL + 'currencies/course');

    if (response.status === 200) {
      return response.data as ICurrency;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}
