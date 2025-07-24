import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Link } from "react-router-dom";
import { Container } from "../components/container";
import { SiAuthelia } from "react-icons/si";
import { Footer } from "../components/footer";

export const EmailVerification = () => {
  const [seconds, setSeconds] = useState(30);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      setIsButtonActive(true);
      return;
    }

    setIsButtonActive(false);

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const resendEmail = () => {
    setIsButtonActive(false);
    setSeconds(30);
  };

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
          gabrielmoura-cma@hotmail.com
        </p>
        {!isButtonActive && (
          <p className="mt-4 text-gray-600">
            Enviar novamente em {seconds} segundos
          </p>
        )}
        <span></span>
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
