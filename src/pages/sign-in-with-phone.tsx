import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Container } from "../components/container";
import { SiAuthelia } from "react-icons/si";
import { Input } from "../components/input";
import { Footer } from "../components/footer";

const schema = z.object({
  phoneNumber: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(z.string().length(11, { message: "Número de celular inválido" })),
});

type FormData = z.infer<typeof schema>;

export const SignInWithPhone = () => {
  const isPending = false;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onSubmit" });

  const onSubmit = ({ phoneNumber }: FormData) => {
    console.log(phoneNumber);
  };

  return (
    <>
      <Container>
        <Link to="/" className="mb-6 flex items-center gap-x-1 sm:hidden">
          <SiAuthelia size={24} />
          <span className="text-xl font-medium">Auth</span>
        </Link>
        <h1 className="text-3xl">Entrar com telefone</h1>
        <form className="mt-7 w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <Input
              type="text"
              placeholder="Número do telefone"
              name="phoneNumber"
              register={register}
              error={errors.phoneNumber?.message}
            />
          </fieldset>
          <button className="mt-7 h-[50px] w-full cursor-pointer rounded-full bg-black text-white transition-opacity hover:opacity-80">
            Continuar
          </button>
          <Link
            to="/"
            className={`mt-6 inline-block w-full text-center hover:underline ${isPending && "pointer-events-none opacity-70"}`}
          >
            Voltar
          </Link>
        </form>
        <div className="mt-6 w-full rounded-xs border border-gray-300 px-3 py-4 text-sm">
          <span className="mb-3 block">
            O número de celular deve seguir o seguinte formato:
          </span>
          <ul>
            <li className="flex items-center gap-x-4">
              <span className="block h-1 w-1 rounded-full bg-black" />
              99 99999-9999 (DDD + número)
            </li>
            <li className="flex items-center gap-x-4">
              <span className="block h-1 w-1 rounded-full bg-black" />
              Não é necessário inserir espaços ou -
            </li>
          </ul>
        </div>
      </Container>
      <Footer />
    </>
  );
};
