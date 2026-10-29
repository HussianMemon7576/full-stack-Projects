
import { useActionState } from "react";
import { Link } from "react-router-dom";
import { Mail, ShieldCheck, ArrowLeft, LoaderCircle } from "lucide-react";
import axios from "axios";
import { forgotPasswordMutation } from "../../hooks/auth.hooks";
import Input from "../Input/Input";
type ResetEmailState = {
  error: string;
  success: string;
};

export default function ResetEmail() {
  const forgotPassword = forgotPasswordMutation();

  async function handleEmailAction(
    _previousState: ResetEmailState,
    formData: FormData
  ): Promise<ResetEmailState> {
    const email = formData.get("email")?.toString().trim() ?? "";

    if (!email) {
      return {
        error: "Email is required.",
        success: "",
      };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return {
        error: "Please enter a valid email address.",
        success: "",
      };
    }

    try {
      const data = await forgotPassword.mutateAsync(email);

      return {
        error: "",
        success:
          data?.message ??
          "If your account exists, password reset instructions will be sent.",
      };
    } catch (error: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ??
          "Something went wrong. Please try again."
        : "Something went wrong. Please try again.";

      return {
        error: message,
        success: "",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(
    handleEmailAction,
    {
      error: "",
      success: "",
    }
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8">
          {/* Header Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-8 ring-blue-50/50">
              <ShieldCheck size={32} strokeWidth={1.8} />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Forgot Password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              No worries! Enter your registered email address
              and we'll help you reset your password.
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <div>
             

              <div className="relative">
                <Mail
                  size={19}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <Input
                label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isPending}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Error Message */}
            {state.error && (
              <div
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {state.error}
              </div>
            )}

        
            {state.success && (
              <div
                role="status"
                className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700"
              >
                {state.success}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Sending Request...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-7 border-t border-gray-100 pt-6 text-center">
            <Link
              to="/Login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back to Login
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Secure password recovery
        </p>
      </div>
    </div>
  );
}