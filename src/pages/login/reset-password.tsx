import { useContext, useTransition } from "react";
import { auth } from "../../services/firebase-connection";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "../../contexts/auth-context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";
import { SiAuthelia } from "react-icons/si";
import { Footer } from "../../components/footer";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const navigate = useNavigate();

  const { email } = useContext(AuthContext);

  const [isPending, startTransition] = useTransition();

  if (!email) {
    return <Navigate to="/sign-in" />;
  }

  const handlePasswordReset = async () => {
    startTransition(async () => {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Email para recuperação de senha enviado");
        navigate("/sign-in");
      } catch (error) {
        console.error("Erro ao enviar email de redefinição de senha: ", error);
        toast.error(
          "Não é possível recuperar sua senha no momento, tente mais tarde.",
        );
      }
    });
  };

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
          onClick={handlePasswordReset}
          disabled={isPending}
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
