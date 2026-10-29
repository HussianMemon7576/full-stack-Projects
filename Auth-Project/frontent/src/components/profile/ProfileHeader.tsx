
import { UserRound } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
          <UserRound size={24} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="text-sm text-gray-500">
            Manage your account settings
          </p>
        </div>
      </div>
    </div>
  );
}
