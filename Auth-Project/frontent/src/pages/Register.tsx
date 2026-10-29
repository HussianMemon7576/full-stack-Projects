import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { registerquery } from "../hooks/auth.hooks";
import type { RegisterData } from "../types/auth.types";
import { setOtpEmail } from "../features/auth/authSlice";
import Input from "../components/Input/Input";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerMutation = registerquery();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    defaultValues: { username: "", email: "", password: "" },
  });

  const isLoading = isSubmitting || registerMutation.isPending;

  const onSubmit = async (formData: RegisterData): Promise<void> => {
    if (isLoading) return;

    clearErrors("root");

    try {
      const data = await registerMutation.mutateAsync(formData);

      const email = data?.data?.email;
      if (email) {
        
        dispatch(setOtpEmail(email));
        navigate("/Otp");
      }
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
          Create Account
        </h1>
        <p className="mb-8 text-center text-gray-500">Register to get started</p>

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
            id="username"
            label="Name"
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            {...register("username", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Name cannot exceed 30 characters",
              },
            })}
            error={errors.username?.message}
          />

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
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            error={errors.password?.message}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Registering..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/Login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}