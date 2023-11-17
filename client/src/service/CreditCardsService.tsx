import axios, { AxiosResponse } from 'axios';
import { API_URL } from '..';
import { isCardNumberValid, isExpiryDateValid, isCVVValid } from '../utils/CreditCard/DataValidator';
import ICreditCardData from '../interfaces/ICreditCardData';

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