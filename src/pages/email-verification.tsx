import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Link, Navigate } from "react-router-dom";
import { Container } from "../components/container";
import { SiAuthelia } from "react-icons/si";
import { Footer } from "../components/footer";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../services/firebase-connection";

export const EmailVerification = () => {
  const [seconds, setSeconds] = useState(60);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [emailHasVerified, setEmailHasVerified] = useState(false);

  const { handleChangeUser, user } = useContext(AuthContext);

  const actionCodeSettings = {
    url: "https://fluxo-autenticacao-eta.vercel.app/dashboard",
    handleCodeInApp: true,
  };

  useEffect(() => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser, actionCodeSettings);
    }
  }, []);

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
    if (!auth.currentUser || auth.currentUser.emailVerified) return;

    const interval = setInterval(async () => {
      await auth.currentUser?.reload();

      if (auth.currentUser?.emailVerified) {
        setEmailHasVerified(true);

        handleChangeUser({
          ...user,
          emailVerified: true,
        });

        clearInterval(interval);
        console.log("Email verificado");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [handleChangeUser, user]);

  const resendEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser, actionCodeSettings).then(
        () => {
          console.log("Email de verificação reenviado.");
        },
      );
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
        {emailHasVerified ? (
          <div className="text-center">
            <h1 className="text-3xl">Sucesso</h1>
            <p className="mt-3">Seu email foi verificado ✅</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl">Verifique seu email</h1>
            <p className="mt-3 text-center text-gray-600">
              Verifique seu email através do link que enviamos para{" "}
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
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};
