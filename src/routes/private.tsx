import type { ReactNode } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
  const {
    user: { signed },
  } = useContext(AuthContext);

  if (!signed) {
    return <Navigate to="/" />;
  }

  return children;
};
