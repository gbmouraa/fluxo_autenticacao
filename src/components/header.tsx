import { Link } from "react-router-dom";
import { SiAuthelia } from "react-icons/si";

export const Header = () => {
  return (
    <header className="p-3">
      <Link to="/" className="hidden items-center gap-x-1 sm:flex">
        <SiAuthelia size={24} />
        <span className="text-xl font-medium">Auth</span>
      </Link>
    </header>
  );
};
