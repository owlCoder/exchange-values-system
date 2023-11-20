import axios, { AxiosResponse } from 'axios';
import { API_URL } from '..';
import { isCardNumberValid, isExpiryDateValid, isCVVValid } from '../utils/CreditCard/DataValidator';
import ICreditCardData from '../interfaces/ICreditCardData';

/**
 * Saves credit card data after validating card details.
 * @param {ICreditCardData} cardData - Credit card data to be saved.
 * @returns {Promise<string | undefined>} A Promise resolving to a status message or undefined.
 * If card information is valid and successfully saved, returns 'Success';
 * otherwise, returns an error message.
 */
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
  
  /**
   * Checks if a credit card exists for a specific user.
   * @param {number} uid - User ID to check for the existence of a credit card.
   * @returns {Promise<string | undefined>} A Promise resolving to a status message or undefined.
   * If a credit card exists for the user, returns 'Success';
   * otherwise, returns an error message.
   */
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

/**
 * Retrieves credit card data associated with a user.
 * @param {number | undefined} uid - User ID.
 * @returns {Promise<Array<ICreditCardData>>} A Promise containing an array of credit card data.
 */
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
  
  /**
   * Activates a credit card for a user.
   * @param {string | undefined} card_number - Credit card number.
   * @param {number | undefined} uid - User ID.
   * @returns {Promise<string>} A Promise resolving to a status message.
   */
  export function ActivateCreditCard(card_number: string | undefined, uid: number | undefined): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        if (card_number !== undefined && uid !== undefined) {
          const response = await axios.put(`${API_URL}cards/updateVerified`, 
            { card_number: card_number, verified: true, uid: uid },
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
          );
  
          if (response.status === 200) {
            resolve('Success');
          } else {
            reject('Credit card couldn\'t be activated. Try again later.');
          }
        } else {
          reject('Invalid card number or user ID');
        }
      } catch (error) {
        reject('Credit card couldn\'t be activated. Try again later.');
      }
    });
  }