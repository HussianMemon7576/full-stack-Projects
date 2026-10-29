
import { Mail, UserRound } from "lucide-react";

type ProfileInfoProps = {
  username: string;
  email: string;
};

export default function ProfileInfo({ username,email}: ProfileInfoProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold">
        Account Information
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <UserRound size={20} className="text-gray-500" />

          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium text-gray-900">
              {username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail size={20} className="text-gray-500" />

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="break-all font-medium text-gray-900">
              {email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
