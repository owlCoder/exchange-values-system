import IUser from "../../interfaces/IUser";

/**
 * Type guard function to check if an object matches the IUser interface.
 * @module isUser
 * @param {any} obj - The object to be checked against the IUser interface.
 * @returns {boolean} Returns true if the object matches the IUser interface; otherwise, returns false.
 */
const isUser = (obj: any): obj is IUser => (
    typeof obj === 'object' &&
    'uid' in obj &&
    'first_name' in obj &&
    'surname' in obj &&
    'address' in obj &&
    'city' in obj &&
    'country' in obj &&
    'phone_number' in obj &&
    'email' in obj &&
    'password' in obj &&
    ('admin' in obj || 'verified' in obj) // Either 'admin' or 'verified' should be present
);

export default isUser;
