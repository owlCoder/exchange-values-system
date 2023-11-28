import ICurrentUser from "../interfaces/Auth/ICurrentUser";

type AuthContextType = {
    currentUser: ICurrentUser | null;
    setUser: (user: ICurrentUser | null) => void;
  };
  
  export default AuthContextType;