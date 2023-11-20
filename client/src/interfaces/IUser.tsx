/**
 * Represents the structure for user information.
 * @interface IUser
 */
interface IUser {
    /**
     * The unique identifier associated with the user (optional).
     * @type {number | undefined}
     */
    uid?: number;
  
    /**
     * The user's first name.
     * @type {string}
     */
    first_name: string;
  
    /**
     * The user's surname.
     * @type {string}
     */
    surname: string;
  
    /**
     * The user's address.
     * @type {string}
     */
    address: string;
  
    /**
     * The city where the user resides.
     * @type {string}
     */
    city: string;
  
    /**
     * The country where the user resides.
     * @type {string}
     */
    country: string;
  
    /**
     * The user's phone number.
     * @type {string}
     */
    phone_number: string;
  
    /**
     * The user's email address.
     * @type {string}
     */
    email: string;
  
    /**
     * The user's password.
     * @type {string}
     */
    password: string;
  
    /**
     * Indicates whether the user has admin privileges (optional).
     * @type {boolean | undefined}
     */
    admin?: boolean;
  
    /**
     * Indicates whether the user is verified (optional).
     * @type {boolean | undefined}
     */
    verified?: boolean;
  }
  
  export default IUser;
  