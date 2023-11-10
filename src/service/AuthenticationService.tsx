import ILogin from '../interfaces/ILogin';

export async function LogIn(creditials: ILogin) {
    try {
        // Make an API call to authenticate the user
        const response = 200; //await AuthenticationService.login(email, password);

        if (response === 200) {
            // Successful login
            // Store the session or token and redirect
            console.log(creditials.email + " " + creditials.password);
            // navigate('/dashboard');
        } else {
            // Handle authentication error
            console.log('Login failed');
        }
    } catch (error) {
        // Handle network or server errors
        console.error('API error:', error);
    }
} 