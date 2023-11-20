/**
 * Represents the structure for current user information.
 * @interface ICurrentUser
 */
interface ICurrentUser {
    /**
     * The unique identifier associated with the user.
     * @type {number}
     */
    uid: number;
  
    /**
     * The authentication token associated with the user.
     * @type {string}
     */
    token: string;
  
    /**
     * Indicates whether the user has admin privileges.
     * @type {boolean}
     */
    admin: boolean;
  
    /**
     * Indicates whether the user is verified.
     * @type {boolean}
     */
    verified: boolean;
  }
  
  export default ICurrentUser;
  