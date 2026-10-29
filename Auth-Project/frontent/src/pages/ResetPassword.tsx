
import { useActionState, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { resetPasswordMutation } from "../hooks/auth.hooks";
import Input from "../components/Input/Input";

type ResetPasswordState = {
  error: string;
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const resetPassword = resetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function resetPasswordAction(
    _previousState: ResetPasswordState,
    formData: FormData
  ): Promise<ResetPasswordState> {
    const newPassword = formData.get("newPassword")?.toString() ?? "";
    const confirmPassword =
      formData.get("confirmPassword")?.toString() ?? "";

    if (!token) {
      return { error: "Reset token is missing. Request a new link." };
    }

    if (newPassword.length < 8) {
      return { error: "Password must be at least 8 characters." };
    }

    if (!/[a-z]/.test(newPassword)) {
      return { error: "Add at least one lowercase letter." };
    }

    if (!/[A-Z]/.test(newPassword)) {
      return { error: "Add at least one uppercase letter." };
    }

    if (!/[0-9]/.test(newPassword)) {
      return { error: "Add at least one number." };
    }

    if (newPassword !== confirmPassword) {
      return { error: "Passwords do not match." };
    }

    try {
      await resetPassword.mutateAsync({
        token,
        newPassword,
        confirmPassword,
      });

      navigate("/Login", { replace: true });

      return { error: "" };
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        return {
          error:
            error.response?.data?.message ??
            "Something went wrong. Please try again.",
        };
      }

      return { error: "Something went wrong. Please try again." };
    }
  }

  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    { error: "" }
  );

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">
          Reset token is missing. Please request a new link.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        action={formAction}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-6 shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Reset Password
        </h1>

      
        <div className="relative">
          <Input
            id="newPassword"
            name="newPassword"
            label="New Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
            }
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            aria-pressed={showConfirmPassword}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {state.error && (
          <p role="alert" className="text-sm text-red-500">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
