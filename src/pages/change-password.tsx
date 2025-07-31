import { useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "../components/container";
import { SiAuthelia } from "react-icons/si";
import { Footer } from "../components/footer";
import { Input } from "../components/input";
import { auth } from "../services/firebase-connection";
import toast from "react-hot-toast";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const schema = z
  .object({
    currentPassword: z.string().nonempty("Insira sua senha atual"),
    newPassword: z
      .string()
      .nonempty("Este campo é obrigátorio")
      .min(12, "Senha deve conter no minimo 12 caracteres"),
    confirmNewPassword: z.string().nonempty("Este campo é obrigátorio"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });

type FormData = z.infer<typeof schema>;

export const ChangePassword = () => {
  const navigate = useNavigate();

  const currentUser = auth.currentUser;

  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = async (FormData: FormData) => {
    if (!currentUser) {
      toast.error("Não foi possível alterar a senha, tente mais tarde.");
      return;
    }

    startTransition(async () => {
      try {
        const credential = EmailAuthProvider.credential(
          currentUser.email!,
          FormData.currentPassword,
        );

        await reauthenticateWithCredential(currentUser, credential);
        console.log("Usuário reautenticado com sucesso");

        await updatePassword(currentUser, FormData.newPassword);
        console.log("Senha alterada com sucesso!");
        toast.success("Senha alterada com sucesso!");
        reset();
        navigate("/dashboard");
      } catch (error: any) {
        if (error.code === "auth/wrong-password") {
          toast.error("A senha atual está incorreta");
        } else {
          toast.error("Erro ao alterar senha");
          console.log("Erro ao alterar senha:", error);
        }
      }
    });
  };

  return (
    <>
      <Container>
        <Link to="/" className="mb-6 flex items-center gap-x-1 sm:hidden">
          <SiAuthelia size={24} />
          <span className="text-xl font-medium">Auth</span>
        </Link>
        <h1 className="text-3xl">Alterar senha</h1>
        <form className="mt-7 w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-y-6">
            <Input
              type="password"
              placeholder="Senha atual"
              name="currentPassword"
              register={register}
              error={errors.currentPassword?.message}
              password
            />
            <Input
              type="password"
              placeholder="Nova senha"
              name="newPassword"
              register={register}
              error={errors.newPassword?.message}
              password
            />
            <Input
              type="password"
              placeholder="Confirmar senha"
              name="confirmNewPassword"
              register={register}
              error={errors.confirmNewPassword?.message}
              password
            />
          </fieldset>
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
          <Link
            to="/dashboard"
            className={`mt-6 inline-block w-full text-center hover:underline ${isPending && "pointer-events-none opacity-70"}`}
          >
            Voltar
          </Link>
        </form>
      </Container>
      <Footer />
    </>
  );
};
