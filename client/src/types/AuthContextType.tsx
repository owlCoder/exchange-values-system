import { ICurrentUser } from "../interfaces/Auth/ICurrentUser";

export type AuthContextType = {
  currentUser: ICurrentUser | null;
  setUser: (user: ICurrentUser | null) => void;
};