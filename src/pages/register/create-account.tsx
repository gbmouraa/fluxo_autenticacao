import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { SiAuthelia } from "react-icons/si";
import { Container } from "../../components/container";
import { Input } from "../../components/input";

const schema = z.object({
  email: z.email("O email não válido").nonempty("Preencha seu email"),
});

type FormData = z.infer<typeof schema>;

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onSubmit" });

  const { handleChangeEmail } = useContext(AuthContext);

  const onSubmit = ({ email }: FormData) => {
    handleChangeEmail(email);
  };

  return (
    <Container>
      <Link to="/" className="mb-2 flex items-center gap-x-1 sm:hidden">
        <SiAuthelia size={24} />
        <span className="text-xl font-medium">Auth</span>
      </Link>
      <h1 className="text-3xl">Criar conta</h1>
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
    </Container>
  );
};
