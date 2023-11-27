import ICurrentUser from "../../interfaces/ICurrentUser";

const isICurrentUser = (obj: any): obj is ICurrentUser => (
    typeof obj === 'object' &&
    'uid' in obj &&
    'token' in obj &&
    'admin' in obj &&
    'verified' in obj
);

export default isICurrentUser;
