import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { SiAuthelia } from "react-icons/si";
import { Container } from "../../components/container";
import { Input } from "../../components/input";

const schema = z.object({
  email: z.email("Insira um email válido").nonempty("Preencha seu email"),
});

type FormData = z.infer<typeof schema>;

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  return (
    <Container>
      <Link to="/" className="mb-2 flex items-center gap-x-1 sm:hidden">
        <SiAuthelia size={24} />
        <span className="text-xl font-medium">Auth</span>
      </Link>
      <h1 className="text-3xl font-semibold">Criar conta</h1>
      <form>
        <fieldset>
          <Input
            type="text"
            placeholder="Endereço de email"
            name="email"
            register={register}
          />
        </fieldset>
      </form>
    </Container>
  );
};
