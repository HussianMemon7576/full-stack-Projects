import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import type { login } from "../types/auth.types";
import { loginquery } from "../hooks/auth.hooks";
import { setOtpEmail, setUser } from "../features/auth/authSlice";
import Input from "../components/Input/Input";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginMutation = loginquery();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<login>({
    defaultValues: { email: "", password: "" },
  });

  const isLoading = isSubmitting || loginMutation.isPending;

  const onSubmit = async (data: login): Promise<void> => {
    if (isLoading) return;

    clearErrors("root");

    try {
      const response = await loginMutation.mutateAsync(data);

      if (response.requiresVerification) {
        dispatch(setOtpEmail(response.email));
        navigate("/Otp");
        return;
      }

      dispatch(setUser(response));
      navigate("/Home", { replace: true });
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ??
          "Something went wrong. Please try again."
        : "Something went wrong. Please try again.";

      setError("root", { type: "server", message });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Login
        </h1>
        <p className="mb-8 text-center text-gray-500">Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {errors.root && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {errors.root.message}
            </p>
          )}

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
            error={errors.email?.message}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            error={errors.password?.message}
          />

          <div className="text-right">
            <Link
              to="/Reset-Email"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/Register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;