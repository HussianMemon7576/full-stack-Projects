
import { Routes, Route } from "react-router-dom";

import AuthInitializer from "./components/AuthInitializer";
import RootRedirect from "./components/RootRedirect";

import PublicRoutes from "./routes/Publicroutes";
import ProtectedRoutes from "./routes/Protectedroutes";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Otp from "./pages/Otp";
import Notfound from "./pages/Notfound";
import ResetEmail from "./components/resetPassword/resetemail";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <AuthInitializer />

      <Routes>
        {/* Root route */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public routes */}
        <Route
          path="/Login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />

        <Route
          path="/Register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
  <Route
          path="/Reset-Email"
          element={
            <PublicRoutes>
              <ResetEmail />
            </PublicRoutes>
          }
        />

        {/* Protected routes */}
        <Route
          path="/Home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

      
        <Route
          path="/Profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />

        {/* OTP route */}
        <Route path="/Otp" element={<Otp />} />
        
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* Not found */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
