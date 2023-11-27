import IUser from "../../interfaces/IUser";

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
    ('admin' in obj || 'verified' in obj)
);

export default isUser;
