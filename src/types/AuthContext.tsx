import ICurrentUser from "../interfaces/ICurrentUser";

type AuthContextType = {
    currentUser: ICurrentUser | null;
    setUser: (user: ICurrentUser | null) => void;
  };
  
  export default AuthContextType;