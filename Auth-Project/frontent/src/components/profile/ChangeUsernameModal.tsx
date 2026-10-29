
import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

type ChangeUsernameModalProps = {
  currentUsername: string;
  onClose: () => void;
  onSubmit: (username: string) => Promise<void>;
};

export default function ChangeUsernameModal({
  currentUsername,
  onClose,
  onSubmit,
}: ChangeUsernameModalProps) {
  const [username, setUsername] = useState(currentUsername);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUsername = username.trim();

    if (!newUsername || newUsername === currentUsername) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit(newUsername);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Change Username
          </h2>

          <button type="button" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="new-username"
              className="mb-1 block text-sm font-medium"
            >
              New username
            </label>

            <input
              id="new-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={3}
              maxLength={20}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

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
                !username.trim() ||
                username.trim() === currentUsername
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Username"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
