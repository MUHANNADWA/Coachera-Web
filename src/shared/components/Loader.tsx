interface LoaderProps {
  center?: boolean;
  className?: string;
}

export default function Loader(props: LoaderProps) {
  return (
    <div
      className={
        props.center
          ? `flex items-center justify-center h-full-s text-lg text-gray-500`
          : ""
      }>
      <div
        className={`h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto ${props.className}`}
        role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
