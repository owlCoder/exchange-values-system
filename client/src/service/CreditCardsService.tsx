import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../main';
import { isCardNumberValid, isExpiryDateValid, isCVVValid } from '../utils/CreditCard/DataValidator';
import { ICreditCardData } from '../interfaces/CreditCards/ICreditCardData';

export async function SaveCreditCardData(cardData: ICreditCardData): Promise<string | undefined> {
  try {
    if (
      isCardNumberValid(cardData.card_number) &&
      isExpiryDateValid(cardData.expiry_date) &&
      isCVVValid(cardData.cvv)
    ) {
      const response: AxiosResponse = await axios.post(`${API_URL}cards/create`, cardData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        return 'Success';
      } else {
        return response.data;
      }
    } else {
      return 'Please check your credit card information';
    }
  } catch (error) {
    throw error;
  }
}

export async function IsExistCreditCardPerUser(uid: number): Promise<string | undefined> {
  try {
    if (uid && uid > 0) {
      const response: AxiosResponse = await axios.post(`${API_URL}cards/checkByUid`, { uid: uid }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        return 'Success';
      } else {
        return response.data;
      }
    } else {
      return 'Please login again. Your session expired';
    }
  } catch (error) {
    throw error;
  }
}

export async function GetUsersCreditCards(uid: number | undefined): Promise<Array<ICreditCardData>> {
  try {
    if (uid && uid > 0) {
      const response: AxiosResponse = await axios.post(`${API_URL}cards/getCardsByUid`, { uid: uid }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function ActivateCreditCard(card_number: string | undefined, uid: number | undefined): Promise<string> {
  if (card_number === undefined || uid === undefined) {
    throw new Error('Invalid card number or user ID');
  }

  try {
    const response: AxiosResponse = await axios.put(`${API_URL}cards/updateVerified`, {
      card_number,
      verified: true,
      uid,
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    if (response.status === 200) {
      return 'Success';
    } else {
      throw new Error('Credit card couldn\'t be activated. Try again later.');
    }
  } catch (error) {
    throw new Error('Credit card couldn\'t be activated. Try again later.');
  }
}