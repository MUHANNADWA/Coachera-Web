import logoImage from "../../assets/logo.svg";

interface LoaderProps {
  center?: boolean;
  className?: string;
  logo?: boolean;
}

export default function Loader({
  center = false,
  className = "",
  logo = false,
}: LoaderProps) {
  return (
    <div
      className={
        center || logo
          ? `flex items-center justify-center h-full-s text-lg text-gray-500`
          : ""
      }>
      {!logo ? (
        <div
          className={`min-w-6 min-h-6 max-h-12 max-w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto ${className}`}
          role="status"></div>
      ) : (
        <div className="flex flex-col items-center">
          <img src={logoImage} className={`w-15 h-15 animate-bounce mr-2`} />
          <p className="text-primary font-semibold animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
}
