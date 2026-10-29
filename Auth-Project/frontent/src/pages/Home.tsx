import { logoutquery } from "../hooks/auth.hooks";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  LogOut,
  ShieldCheck,
  ArrowRight,
  LoaderCircle,
  LayoutDashboard,
} from "lucide-react";

const Home = () => {
  const logoutmutation = logoutquery();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (logoutmutation.isPending) return;

    try {
      const response = await logoutmutation.mutateAsync();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <LayoutDashboard size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              MyDashboard
            </span>
          </div>

          <button
            onClick={() => navigate("/Profile")}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <UserRound size={18} />
            <span className="hidden sm:inline">My Profile</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-10 text-white shadow-lg shadow-blue-100 sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />

          <div className="pointer-events-none absolute -bottom-24 right-40 h-48 w-48 rounded-full bg-blue-500/50" />

          <div className="relative z-10 max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">
              <ShieldCheck size={15} />
              Your account is protected
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Welcome Home!
            </h1>

            <p className="mt-4 max-w-md text-sm leading-7 text-blue-100 sm:text-base">
              Great to have you here. Manage your account, update your
              profile, and keep your account settings up to date.
            </p>

            <button
              onClick={() => navigate("/Profile")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 active:scale-[0.98]"
            >
              View Profile
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* Dashboard Heading */}
        <div className="mb-6 mt-12">
          <h2 className="text-xl font-bold text-gray-900">
            Quick Actions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account from one place.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Profile Card */}
          <button
            onClick={() => navigate("/Profile")}
            className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
              <UserRound size={27} />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-gray-900">
                My Profile
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                View your personal information and account settings.
              </p>
            </div>

            <ArrowRight
              size={20}
              className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
            />
          </button>

          {/* Security Card */}
          <div className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <ShieldCheck size={27} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Account Security
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Keep your account information and security settings up to date.
              </p>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <LogOut size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Sign out of your account
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Securely end your current session.
              </p>
            </div>
          </div>

          <button
            onClick={handleClick}
            disabled={logoutmutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {logoutmutation.isPending ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut size={18} />
                Logout
              </>
            )}
          </button>
        </div>

        {logoutmutation.isError && (
          <p className="mt-4 text-right text-sm text-red-500">
            Logout failed. Please try again.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-5 py-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} MyDashboard. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;