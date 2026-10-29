
import axios from "axios";

export function getErrorMessage(error: unknown): string {
  // 1. Axios / backend API errors
  if (axios.isAxiosError(error)) {
    // Backend ne response diya hai
    const data = error.response?.data;
console.log(data)
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }

    // Backend validation errors, e.g. Zod
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      const firstError = data.errors[0];

      if (typeof firstError === "string") {
        return firstError;
      }

      if (typeof firstError?.message === "string") {
        return firstError.message;
      }
    }

    // Request timeout
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return "Request timeout. Please try again.";
    }

    // Server tak connection nahi bana
    if (!error.response) {
      return "Server se connection nahi ho raha. Please try again.";
    }

    // Backend ne response diya, lekin message nahi mila
    return "Request failed. Please try again.";
  }

  // 2. Normal JavaScript errors
  if (error instanceof Error) {
    return error.message;
  }

  // 3. Unknown errors
  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return "Something went wrong. Please try again.";
}
