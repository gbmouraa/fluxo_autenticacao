import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "../../components/container";
import { SiAuthelia } from "react-icons/si";
import { Input } from "../../components/input";
import googleLogo from "../../assets/logo-google.svg";
import microsoftLogo from "../../assets/logo-microsoft.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import { Footer } from "../../components/footer";

const schema = z.object({
  email: z.email("O email não válido").nonempty("Preencha seu email"),
});

type FormData = z.infer<typeof schema>;

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onSubmit" });

  const { handleChangeEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = ({ email }: FormData) => {
    handleChangeEmail(email);
    navigate("/sign-in/password");
  };

  return (
    <>
      <Container>
        <Link to="/" className="mb-6 flex items-center gap-x-1 sm:hidden">
          <SiAuthelia size={24} />
          <span className="text-xl font-medium">Auth</span>
        </Link>
        <h1 className="text-3xl">Bem vindo de volta</h1>
        <form className="mt-7 w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <Input
              type="text"
              placeholder="Endereço de email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
          </fieldset>
          <button className="mt-7 h-[50px] w-full cursor-pointer rounded-full bg-black text-white transition-opacity hover:opacity-80">
            Continuar
          </button>
        </form>
        <div className="mt-7 w-full">
          <p className="text-center">
            Ainda não possui uma conta?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-2">
            <div className="h-px w-full bg-gray-200"></div>
            <span className="block text-center text-xs font-semibold tracking-wide">
              OU
            </span>
            <div className="h-px w-full bg-gray-200"></div>
          </div>
          <div className="mt-6 space-y-3">
            <button className="flex h-[50px] w-full cursor-pointer items-center gap-x-3 rounded-full border border-gray-300 px-5 transition-colors hover:bg-gray-200/60">
              <img src={googleLogo} alt="Logo do Google" className="w-4" />
              Continuar com Google
            </button>
            <button className="flex h-[50px] w-full cursor-pointer items-center gap-x-3 rounded-full border border-gray-300 px-5 transition-colors hover:bg-gray-200/60">
              <img
                src={microsoftLogo}
                alt="Logo da Microsoft"
                className="w-[19px]"
              />
              Continuar com Microsoft
            </button>
            <button className="flex h-[50px] w-full cursor-pointer items-center gap-x-3 rounded-full border border-gray-300 px-5 transition-colors hover:bg-gray-200/60">
              <img src={phoneIcon} alt="Icone telefone" className="w-[20px]" />
              Continuar com telefone
            </button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};
