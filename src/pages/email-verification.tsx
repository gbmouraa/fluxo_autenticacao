import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container } from "../components/container";
import { SiAuthelia } from "react-icons/si";
import { Footer } from "../components/footer";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../services/firebase-connection";
import toast from "react-hot-toast";

export const EmailVerification = () => {
  const [seconds, setSeconds] = useState(60);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const { handleChangeUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isButtonActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsButtonActive(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isButtonActive]);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const interval = setInterval(async () => {
      await auth.currentUser?.reload();
      console.log("Aguardando verificação de email...");

      if (auth.currentUser?.emailVerified) {
        clearInterval(interval);

        handleChangeUser({
          ...user,
          emailVerified: true,
        });

        console.log("Email verificado");
        toast.success("Email verificado com sucesso.");
        navigate("/dashboard");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [handleChangeUser, user, navigate]);

  const resendEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser).then(() => {
        console.log("Email de verificação reenviado.");
      });
      setSeconds(60);
      setIsButtonActive(false);
    }
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container>
        <Link to="/" className="mb-6 flex items-center gap-x-1 sm:hidden">
          <SiAuthelia size={24} />
          <span className="text-xl font-medium">Auth</span>
        </Link>
        <h1 className="text-3xl">Verifique seu email</h1>
        <p className="mt-3 text-center text-gray-600">
          Verifique seu email através do link que enviamos para
          {user?.email}
        </p>
        {!isButtonActive && (
          <p className="mt-4 text-gray-600">
            Enviar novamente em {seconds} segundos
          </p>
        )}
        <button
          className="mt-7 h-[50px] w-full cursor-pointer rounded-full bg-black text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={!isButtonActive}
          onClick={resendEmail}
        >
          Reenviar email
        </button>
      </Container>
      <Footer />
    </>
  );
};
