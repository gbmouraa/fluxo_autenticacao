import { Link } from "react-router-dom";
import { SiAuthelia } from "react-icons/si";

export const Header = () => {
  return (
    <header className="px-3 pt-5">
      <Link to="/" className="hidden items-center gap-x-1 sm:flex">
        <SiAuthelia size={24} />
        <span className="text-xl font-medium tracking-wide">Auth</span>
      </Link>
    </header>
  );
};
