import { createContext } from "react";

export type User = {
  email: string | null;
  uid: string | null;
  emailVerified: boolean;
  signed: boolean;
};

type AuthContextValue = {
  user: User;
  email: string;
  loading: boolean;
  createAccountWithEmailAndPassword: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  handleChangeEmail: (email: string) => void;
  handleChangeUser: (user: User) => void;
};

export const AuthContext = createContext({} as AuthContextValue);
