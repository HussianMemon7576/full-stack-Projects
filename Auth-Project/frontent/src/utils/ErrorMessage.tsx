
import { getErrorMessage } from "./getErrorMessage";

interface ErrorMessageProps {
  error: unknown;
}

export default function ErrorMessage({
  error,
}: ErrorMessageProps) {
  if (!error) return null;

  return (
    <p
      role="alert"
      className="rounded-md bg-red-50 p-3 text-sm text-red-700"
    >
      {getErrorMessage(error)}
    </p>
  );
}
