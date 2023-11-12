import axios from 'axios';
import ILogin from '../interfaces/ILogin';
import ICurrentUser from '../interfaces/ICurrentUser';
import { API_URL } from '..';

// Call API to check is token still valid
export async function Token(creditials: ILogin) {
    // TODO
}

export function LogIn(credentials: ILogin): Promise<ICurrentUser> {
    return new Promise<ICurrentUser>(async (resolve, reject) => {
      try {
        const response = await axios.post(API_URL + 'auth0/', credentials, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        });
  
        if (response.status === 200) {
            resolve(response.data as ICurrentUser);
        } else {
            reject({ message: 'Login failed' });
        }
      } catch (error) {
            reject(error);
      }
    });
  }

export async function LogOut() {
    // Call API to clear session on Flask API and remove pair<uid, ICurrentUser> from database
    // TODO

    // Clear session on client
    sessionStorage.removeItem('currentUser');
}