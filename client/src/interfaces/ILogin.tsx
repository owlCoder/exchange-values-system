/**
 * Represents the structure for login credentials.
 * @interface ILogin
 */
interface ILogin {
    /**
     * The user's email address for login.
     * @type {string}
     */
    email: string;
  
    /**
     * The user's password for login.
     * @type {string}
     */
    password: string;
  }
  
  export default ILogin;
  