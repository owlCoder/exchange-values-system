import axios from 'axios';
import ILogin from '../interfaces/ILogin';

const apiUrl = 'http://localhost:5000/api/';

// Call API to check is token still valid
export async function Token(creditials: ILogin) {
    // TODO
}

export async function LogIn(credentials: ILogin): Promise<any> {
    try {
        const response = await fetch(
        apiUrl + 'auth0/',
        {
            method: 'POST',
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: {
                'Content-Type': 'application/json',
              }
        }
      );
  
      // Check the status code of the response
      if (response.status === 200) {
        // Successful login, do something with the response data if needed
        const responseData = response;
        console.log('Login successful:', responseData);
  
        // Continue with the rest of your logic here
      } else {
        // Handle other status codes if necessary
        console.log('Login failed');
      }
  
      // Handle other logic after the API call here
    } catch (error) {
      // Handle network or server errors
  
      // You can return an error object or throw an exception if needed
      return error;
    }
  }

export async function LogOut() {
    // Call API to clear session on Flask API and remove pair<uid, ICurrentUser> from database
    // TODO

    // Clear session on client
    sessionStorage.removeItem('currentUser');
}