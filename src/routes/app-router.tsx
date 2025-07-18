import { Routes, Route, Navigate } from "react-router-dom";
import { CreateAccount } from "../pages/register/create-account";
import { Password } from "../pages/register/password";
import { Login } from "../pages/login";
import { EmailVerification } from "../pages/email-verification";
import { Header } from "../components/header";
import { Container } from "../components/container";

export const AppRouter = () => {
  return (
    <div className="m-auto h-screen w-full max-w-7xl">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/create-account" replace />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/create-account/password" element={<Password />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verification" element={<EmailVerification />} />
        </Routes>
      </Container>
    </div>
  );
};
