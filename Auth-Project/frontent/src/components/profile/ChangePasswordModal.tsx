
import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

type ChangePasswordModalProps = {
  onClose: () => void;
  onSubmit: (
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
};

export default function ChangePasswordModal({
  onClose,
  onSubmit,
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password validation
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);

  const isPasswordValid =
    hasMinLength && hasUppercase && hasLowercase;

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (!oldPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (!hasMinLength) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!hasUppercase) {
      setError(
        "Password must contain at least one uppercase letter (A-Z)."
      );
      return;
    }

    if (!hasLowercase) {
      setError(
        "Password must contain at least one lowercase letter (a-z)."
      );
      return;
    }

    setLoading(true);

    try {
      await onSubmit(oldPassword, newPassword);
      onClose();
    } catch (err) {
      
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Change Password
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="old-password"
              className="mb-1 block text-sm font-medium"
            >
              old password
            </label>

            <input
              id="old-password"
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setError("");
              }}
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="mb-1 block text-sm font-medium"
            >
              New password
            </label>

            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />

            <div className="mt-2 space-y-1 text-xs">
              <p className={hasMinLength ? "text-green-600" : "text-gray-500"}>
                {hasMinLength ? "✓" : "○"} At least 8 characters
              </p>

              <p className={hasUppercase ? "text-green-600" : "text-gray-500"}>
                {hasUppercase ? "✓" : "○"} At least one uppercase letter (A-Z)
              </p>

              <p className={hasLowercase ? "text-green-600" : "text-gray-500"}>
                {hasLowercase ? "✓" : "○"} At least one lowercase letter (a-z)
              </p>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !oldPassword ||
                !isPasswordValid
              }
              className="rounded-lg bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
