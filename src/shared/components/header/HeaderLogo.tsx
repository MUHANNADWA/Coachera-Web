import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import logoWhite from "../../../assets/logo-white.svg";

export default function HeaderLogo({
  variant = "primary",
}: {
  variant?: "primary" | "white";
}) {
  return (
    <Link to="/" className="flex items-center mr-12">
      {variant == "primary" ? (
        <>
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-xl px-2 font-bold text-primary">coachera</h1>
        </>
      ) : (
        <>
          <img src={logoWhite} alt="logo" className="w-10" />
          <h1 className="text-xl px-2 font-bold text-white">coachera</h1>
        </>
      )}
    </Link>
  );
}
