import ICurrentUser from "../interfaces/ICurrentUser";

type AuthContextType = {
    currentUser: ICurrentUser | null
  };
  
  export default AuthContextType;