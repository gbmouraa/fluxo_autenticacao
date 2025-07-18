import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useForm } from "react-hook-form";
import { Container } from "../../components/container";
import { SiAuthelia } from "react-icons/si";
import { Input } from "../../components/input";
import { Footer } from "../../components/footer";
import { EmailPreview } from "../../components/email-preview";

const schema = z.object({
  password: z.string().min(12, "Pelo menos 12 caracteres"),
});

type FormData = z.infer<typeof schema>;

export const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = ({ password }: FormData) => {
    // TODO: Pegar email do contexto e criar conta no firebase
  };

  return (
    <>
      <Container>
        <Link to="/" className="mb-6 flex items-center gap-x-1 sm:hidden">
          <SiAuthelia size={24} />
          <span className="text-xl font-medium">Auth</span>
        </Link>
        <h1 className="text-3xl">Criar conta</h1>
        <p className="mt-3 text-gray-600">Crie uma senha para continuar</p>
        <form className="mt-7 w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <EmailPreview />
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              register={register}
              password
            />
          </fieldset>
          {errors?.password && (
            <div className="mt-6 rounded-xs border border-gray-300 px-3 py-4 text-sm">
              <span className="mb-3 block">Sua senha deve conter:</span>
              <ul>
                <li className="flex items-center gap-x-4">
                  <span className="block h-1 w-1 rounded-full bg-black" />
                  {errors.password.message}
                </li>
              </ul>
            </div>
          )}
          <button className="mt-7 h-[50px] w-full cursor-pointer rounded-full bg-black text-white transition-opacity hover:opacity-80">
            Continuar
          </button>
        </form>
        <div className="mt-7 w-full">
          <p className="text-center">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};
