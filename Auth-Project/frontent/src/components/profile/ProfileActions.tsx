
import { useState } from "react";
import { KeyRound, UserRoundPen } from "lucide-react";
import ChangeUsernameModal from "./ChangeUsernameModal";
import ChangePasswordModal from "./ChangePasswordModal";

type ProfileActionsProps = {
  username: string;
  onChangeUsername: (username: string) => Promise<void>;
  onChangePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
};

export default function ProfileActions({
  username,
  onChangeUsername,
  onChangePassword,
}: ProfileActionsProps) {
  const [showUsernameModal, setShowUsernameModal] =
    useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  return (
    <>
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Security Settings
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setShowUsernameModal(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
          >
            <UserRoundPen size={18} />
            Change Username
          </button>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-white hover:bg-gray-700"
          >
            <KeyRound size={18} />
            Change Password
          </button>
        </div>
      </div>

      {showUsernameModal && (
        <ChangeUsernameModal
          currentUsername={username}
          onClose={() => setShowUsernameModal(false)}
          onSubmit={onChangeUsername}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSubmit={onChangePassword}
        />
      )}
    </>
  );
}
