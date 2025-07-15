import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";

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
    <>
      <div className="relative h-[50px] w-full">
        <input
          className={`peer absolute top-0 left-0 z-10 h-[50px] w-full rounded-full border border-gray-300 px-5 py-3 placeholder-transparent transition-all outline-none focus:border-blue-600 ${error && "border-red-500"}`}
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name, rules)}
        />
        <label
          className={`absolute left-[18px] z-20 block -translate-y-1/2 cursor-text bg-gray-50 px-[2px] text-sm text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 ${error && "text-red-500"}`}
          htmlFor={name}
        >
          {placeholder}
        </label>
        {error && (
          <span className="absolute -bottom-6 flex items-center gap-x-1 text-xs text-red-500">
            <RiErrorWarningFill size={16} />
            {error}
          </span>
        )}
      </div>
    </>
  );
};
