import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { auth } from "../services/firebase-connection";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { User } from "./auth-context";
import toast from "react-hot-toast";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    email: null,
    uid: null,
    emailVerified: false,
    signed: false,
  });
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // TODO: usar useEffect para verificar se há usuário
  // logado para fazer o redirecionamento

  const handleChangeEmail = (email: string) => {
    setEmail(email);
  };

  const handleChangeUser = (user: User) => {
    setUser(user);
  };

  const createAccountWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser({
          email: email,
          uid: user.user.uid,
          emailVerified: false,
          signed: true,
        });
        sendEmailVerification(user.user);
        navigate("/email-verification");
      })
      .catch((error) => {
        console.error("Erro ao cria conta: ", error);
        toast.error("Erro ao criar conta, tente novamente.");
      })
      .finally(() => setLoading(false));
  };

  // função para fazer login com email e senha
  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const userCredentials = user.user;

        setUser({
          email: userCredentials.email,
          uid: userCredentials.uid,
          emailVerified: userCredentials.emailVerified,
          signed: true,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Não foi possível fazer seu login: ", error.message);
        toast.error("Erro ao fazer login, tente novamente.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        email,
        handleChangeEmail,
        user,
        handleChangeUser,
        createAccountWithEmailAndPassword,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
