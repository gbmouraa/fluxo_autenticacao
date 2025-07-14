import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
}

export const Input = ({
  type,
  placeholder,
  name,
  error,
  register,
  rules,
}: InputProps) => {
  return (
    <div>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      {error && <span>{error}</span>}
    </div>
  );
};
