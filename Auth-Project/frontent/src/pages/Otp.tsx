
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Input from "../components/Input/Input";
import { setUser } from "../features/auth/authSlice";
import { Otpquery } from "../hooks/auth.hooks";
import type { RootState } from "../store/store";

const Otp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector(
    (state: RootState) => state.auth.otpEmail
  );

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const verifyMutation = Otpquery();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!/^\d{4}$/.test(otp)) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    if (!email) {
      setError("Email not found. Please login again.");
      return;
    }

    try {
      const response = await verifyMutation.mutateAsync({
        email,
        otp,
      });

      dispatch(setUser(response));
      navigate("/Home");
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        setError(
          error.response?.data?.message ??
            "OTP verification failed. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <p className="mb-4 text-gray-700">
            Email not found. Please login again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/Login")}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Verify OTP
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          We've sent a verification code to
        </p>

        {/* Email par OTP bhejne ka message */}
        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-center">
          <p className="mb-1 text-sm text-blue-700">
            OTP sent to
          </p>

          <p className="break-all font-semibold text-gray-900">
            {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Reusable Input component */}
          <Input
            id="otp"
            name="otp"
            label="One-Time Password"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(event) => {
              setOtp(
                event.target.value.replace(/\D/g, "").slice(0, 4)
              );
            }}
            error={error}
            required
          />

          {success && (
            <p role="status" className="text-sm text-green-600">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {verifyMutation.isPending
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Didn't receive the code? Check your inbox and spam folder.
        </p>
      </div>
    </div>
  );
};

export default Otp;
