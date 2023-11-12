interface ICurrentUser {
    uid: number;
    token: string;
    admin: boolean;
    verified: boolean;
};

export default ICurrentUser;