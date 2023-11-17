interface IUser {
    uid?: number;
    first_name: string;
    surname: string;
    address: string;
    city: string;
    country: string;
    phone_number: string;
    email: string;
    password: string;
    admin?: boolean;
    verified?: boolean;
}

export default IUser;