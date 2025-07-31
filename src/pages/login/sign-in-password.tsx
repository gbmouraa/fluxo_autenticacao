import { useContext, useTransition } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { Input } from "../../components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "../../components/container";
import { Link, Navigate } from "react-router-dom";
import { SiAuthelia } from "react-icons/si";
import { EmailPreview } from "../../components/email-preview";
import { Footer } from "../../components/footer";

const schema = z.object({
  password: z.string().min(12, "Senha inválida"),
});

type FormData = z.infer<typeof schema>;

export const SignInPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const [isPending, startTransition] = useTransition();

  const { email, signIn } = useContext(AuthContext);

  const onSubmit = ({ password }: FormData) => {
    startTransition(async () => {
      signIn(email, password);
    });
  };

  if (!email) {
    return <Navigate to="sign-in" />;
  }

  return (
    <>
      <Container>
        <Link to="/" className="mb-6 flex items-center gap-x-1 sm:hidden">
          <SiAuthelia size={24} />
          <span className="text-xl font-medium">Auth</span>
        </Link>
        <h1 className="text-3xl">Bem vindo de volta</h1>
        <p className="mt-3 text-center text-gray-600">
          Insira sua senha para continuar
        </p>
        <form className="mt-7 w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <EmailPreview />
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              register={register}
              error={errors.password?.message}
              password
            />
          </fieldset>
          <Link
            to="/sign-in/reset-password"
            className="mt-3 block text-blue-600 hover:underline"
          >
            Esqueceu sua senha?
          </Link>
          <button
            className="mt-7 h-[50px] w-full cursor-pointer rounded-full bg-black text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <div className="mx-auto h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            ) : (
              "Continuar"
            )}
          </button>
        </form>
        <div className="mt-7 w-full">
          <p className="text-center">
            Ainda não possui uma conta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};
