import HeaderLogoImage from "../../assets/logo-header.png";

export function HeaderLogo() {
  return (
    <img
      src={HeaderLogoImage}
      alt=""
      className="block h-auto w-full"
      aria-hidden="true"
    />
  );
}
