import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { Link, Navigate } from "react-router-dom";
import { Container } from "../../components/container";
import { SiAuthelia } from "react-icons/si";
import { Footer } from "../../components/footer";

export const ResetPassword = () => {
  const { email } = useContext(AuthContext);

  if (!email) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <Container>
        <Link to="/" className="mb-6 flex items-center gap-x-1 sm:hidden">
          <SiAuthelia size={24} />
          <span className="text-xl font-medium">Auth</span>
        </Link>
        <h1 className="text-3xl">Recuperar senha</h1>
        <p className="mt-3 text-center text-gray-600">
          Clique em "Continuar" para recuperar sua senha para {email}
        </p>
        <button
          className="mt-7 h-[50px] w-full cursor-pointer rounded-full bg-black text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
        >
          Continuar
        </button>
        <Link to="/sign-in" className="mt-6 hover:underline">
          Voltar para login
        </Link>
      </Container>
      <Footer />
    </>
  );
};
