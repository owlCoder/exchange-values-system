import { ICurrentUser } from "../../interfaces/Auth/ICurrentUser";

export const isICurrentUser = (obj: any): obj is ICurrentUser => (
    typeof obj === 'object' &&
    'uid' in obj &&
    'token' in obj &&
    'admin' in obj &&
    'verified' in obj
);