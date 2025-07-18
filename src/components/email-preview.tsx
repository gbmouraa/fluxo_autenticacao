import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth-context";
import { useNavigate, Link } from "react-router-dom";

export const EmailPreview = () => {
  const { email } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [navigate, email]);

  return (
    <>
      <div className="relative mb-6 h-[50px] w-full">
        <input
          className="absolute top-0 left-0 z-10 h-[50px] w-full rounded-full border border-gray-300 px-5 py-3 placeholder-transparent transition-all outline-none"
          value={email}
          readOnly
        />
        <label className="absolute top-0 left-[18px] z-20 block -translate-y-1/2 cursor-text bg-gray-50 px-[2px] text-sm text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base">
          Endereço de email
        </label>
        <Link
          to={`/create-account`}
          className="absolute top-1/2 right-5 z-30 block -translate-y-1/2 bg-gray-50 text-blue-600 hover:underline"
        >
          Editar
        </Link>
      </div>
    </>
  );
};
