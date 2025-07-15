import { createContext } from "react";

type AuthContextValue = {
  email: string;
  handleChangeEmail: (email: string) => void;
};

export const AuthContext = createContext({} as AuthContextValue);
