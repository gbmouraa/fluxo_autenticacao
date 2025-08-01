import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { auth } from "../services/firebase-connection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import type { User } from "./auth-context";
import toast from "react-hot-toast";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({
    email: null,
    uid: null,
    emailVerified: false,
    signed: false,
    loginMethod: null,
  });

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userCredentials) => {
      if (!userCredentials) {
        setUser({
          email: null,
          uid: null,
          emailVerified: false,
          signed: false,
          loginMethod: null,
        });
        return;
      }

      setUser({
        email: userCredentials.email,
        uid: userCredentials.uid,
        emailVerified: userCredentials.emailVerified,
        signed: true,
        loginMethod: "Email/senha",
      });
    });

    return () => unsub();
  }, []);

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
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser({
          email: email,
          uid: user.user.uid,
          emailVerified: false,
          signed: true,
          loginMethod: "Email/senha",
        });

        navigate("/email-verification");
      })
      .catch((error) => {
        console.error("Erro ao cria conta: ", error);
        toast.error("Erro ao criar conta, tente novamente.");
      });
  };

  const signWithGoogleAccount = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      handleChangeUser({
        email: result.user.email,
        uid: result.user.uid,
        // não é feito a validação de email
        emailVerified: true,
        signed: true,
        loginMethod: "Conta Google",
      });

      navigate("/dashboard");

      console.log("Usuário logado com sucesso");
    } catch (err: any) {
      console.log("Não foi possível fazer login:", err);
      toast.error("Erro ao fazer login, tente novamente mais tarde");
    }
  };

  // função para fazer login com email e senha
  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const userCredentials = user.user;

        setUser({
          email: userCredentials.email,
          uid: userCredentials.uid,
          emailVerified: userCredentials.emailVerified,
          signed: true,
          loginMethod: "Email/senha",
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Não foi possível fazer seu login: ", error.message);
        toast.error("Erro ao fazer login, tente novamente.");
      });
  };

  return (
    <AuthContext
      value={{
        email,
        handleChangeEmail,
        user,
        handleChangeUser,
        createAccountWithEmailAndPassword,
        signIn,
        signWithGoogleAccount,
      }}
    >
      {children}
    </AuthContext>
  );
};
