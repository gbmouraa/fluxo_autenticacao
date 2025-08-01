import { Routes, Route, Navigate } from "react-router-dom";
import { CreateAccount } from "../pages/register/create-account";
import { Password } from "../pages/register/password";
import { SignIn } from "../pages/login/sign-in";
import { EmailVerification } from "../pages/email-verification";
import { Header } from "../components/header";
import { Container } from "../components/container";
import { Dashboard } from "../pages/dashboard";
import { SignInPassword } from "../pages/login/sign-in-password";
import { Private } from "./private";
import { ResetPassword } from "../pages/login/reset-password";
import { ChangePassword } from "../pages/change-password";

export const AppRouter = () => {
  return (
    <div className="m-auto h-screen w-full max-w-7xl">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/create-account" replace />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/create-account/password" element={<Password />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/email-verification"
            element={
              <Private>
                <EmailVerification />
              </Private>
            }
          />
          <Route path="/sign-in/password" element={<SignInPassword />} />
          <Route
            path="/dashboard"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          />
          <Route path="/sign-in/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard/change-password"
            element={
              <Private>
                <ChangePassword />
              </Private>
            }
          />
        </Routes>
      </Container>
    </div>
  );
};
