import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Container } from "../components/container";
import { SiAuthelia } from "react-icons/si";
import { Input } from "../components/input";
import { Footer } from "../components/footer";

const schema = z.object({
  code: z
    .string()
    .nonempty("Insira o código")
    .length(4, "O código não é válido"),
});

type FormData = z.infer<typeof schema>;

export const EmailVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onSubmit" });

  const onSubmit = ({ code }: FormData) => {
    alert("Hello");
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
          Insira o código de verificação enviado para
          gabrielmoura-cma@hotmail.com
        </p>
        <form className="mt-7 w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <Input
              type="text"
              placeholder="Código"
              name="code"
              register={register}
              error={errors.code?.message}
            />
          </fieldset>
          <button className="mt-7 h-[50px] w-full cursor-pointer rounded-full bg-black text-white transition-opacity hover:opacity-80">
            Continuar
          </button>
          <button className="mx-auto mt-4 block cursor-pointer">
            Reenviar email
          </button>
        </form>
      </Container>
      <Footer />
    </>
  );
};
