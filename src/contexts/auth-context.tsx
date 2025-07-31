import { createContext } from "react";

export type User = {
  email: string | null;
  uid: string | null;
  emailVerified: boolean;
  signed: boolean;
  loginMethod: string | null;
};

type AuthContextValue = {
  user: User;
  email: string;
  createAccountWithEmailAndPassword: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  handleChangeEmail: (email: string) => void;
  handleChangeUser: (user: User) => void;
};

export const AuthContext = createContext({} as AuthContextValue);
