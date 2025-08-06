import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-connection";
import { AuthContext } from "../contexts/auth-context";
import toast from "react-hot-toast";
import { Container } from "../components/container";
import { Footer } from "../components/footer";
import { SiAuthelia } from "react-icons/si";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { user, handleChangeUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.emailVerified) {
      navigate("/email-verification");
    }
  }, [navigate, user.emailVerified, user]);

  const logOut = async () => {
    setLoading(true);

    await signOut(auth)
      .then(() => {
        handleChangeUser({
          email: null,
          uid: null,
          emailVerified: false,
          signed: false,
          loginMethod: "Email/senha",
        });
        navigate("/sign-in");
      })
      .catch((error) => {
        toast.error("Não foi possivél sair, tente novamnete.");
        console.error("Erro ao sair: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container>
        <Link to="/" className="mb-6 flex items-center gap-x-1 sm:hidden">
          <SiAuthelia size={24} />
          <span className="text-xl font-medium">Auth</span>
        </Link>
        <span>Você está logado com {user.loginMethod}</span>
        <span>Email: {user.email}</span>
        {user.loginMethod === "Email/senha" && (
          <Link
            to="/dashboard/change-password"
            className="text-blue-600 hover:underline"
          >
            Alterar senha
          </Link>
        )}
        <button
          className="mt-7 h-[50px] w-full cursor-pointer rounded-full bg-black text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={logOut}
          disabled={loading}
        >
          {loading ? (
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          ) : (
            "Sair"
          )}
        </button>
      </Container>
      <Footer />
    </>
  );
};
