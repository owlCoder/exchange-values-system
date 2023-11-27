import axios from 'axios';
import { API_URL } from '../main';
import ICurrency from '../interfaces/ICurrency';

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
