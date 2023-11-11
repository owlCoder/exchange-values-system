import ILogin from '../interfaces/ILogin';

// Call API to check is token still valid
export async function Token(creditials:ILogin) {
    // TODO
}


export async function LogIn(creditials: ILogin) {
    // Call API to check user creditials in MySQL database
    // TODO 
    // Use util method for password hashing and send hashed passwords to API to check creditials
    // For security reasons never use plain text passwords
    // Return value of API is interface ICurrentUser which contains newly created token

    // Set current user in session with new data received from FLASK API
    // New data contains all fields from ICurrentUser interface

    // try {
    //     // Make an API call to authenticate the user
    //     const response = 200; //await AuthenticationService.login(email, password);

    //     if (response === 200) {
    //         // Successful login
    //         // Store the session or token and redirect
    //         console.log(creditials.email + " " + creditials.password);
    //         // navigate('/dashboard');
    //     } else {
    //         // Handle authentication error
    //         console.log('Login failed');
    //     }
    // } catch (error) {
    //     // Handle network or server errors
    //     console.error('API error:', error);
    // }
    //sessionStorage.setItem('currentUser', "{uid: 1, token: '122', admin: true}");
    return {code: 200, payload: {uid: Math.random(), token: '122', admin: true}};
};

export async function LogOut() {
    // Call API to clear session on Flask API and remove pair<uid, ICurrentUser> from database
    // TODO

    // Clear session on client
    sessionStorage.removeItem('currentUser');
}