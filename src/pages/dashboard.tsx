import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-connection";
import { AuthContext } from "../contexts/auth-context";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { user, handleChangeUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.emailVerified) {
      navigate("/email-verification");
    }
  }, [navigate, user.emailVerified]);

  const logOut = async () => {
    setLoading(true);

    await signOut(auth)
      .then(() => {
        handleChangeUser({
          email: null,
          uid: null,
          emailVerified: false,
          signed: false,
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
    <div className="flex w-full flex-col text-center">
      <span>Você está logado</span>
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
    </div>
  );
};
