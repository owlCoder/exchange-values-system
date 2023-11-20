import ICurrentUser from "../../interfaces/ICurrentUser";

/**
 * Type guard function to check if an object matches the ICurrentUser interface.
 * @module isICurrentUser
 * @param {any} obj - The object to be checked against the ICurrentUser interface.
 * @returns {boolean} Returns true if the object matches the ICurrentUser interface; otherwise, returns false.
 */
const isICurrentUser = (obj: any): obj is ICurrentUser => (
    typeof obj === 'object' &&
    'uid' in obj &&
    'token' in obj &&
    'admin' in obj &&
    'verified' in obj
);

export default isICurrentUser;
