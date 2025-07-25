import { createContext } from "react";

export type User = {
  email: string;
  uid: string;
  emailVerified: boolean;
};

type AuthContextValue = {
  user: User | null;
  email: string;
  signed: boolean;
  createAccountWithEmailAndPassword: (email: string, password: string) => void;
  handleChangeEmail: (email: string) => void;
  handleChangeUser: (user: User) => void;
};

export const AuthContext = createContext({} as AuthContextValue);
