import { useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (email: string) => {
    setEmail(email);
  };

  return (
    <AuthContext.Provider value={{ email, handleChangeEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
