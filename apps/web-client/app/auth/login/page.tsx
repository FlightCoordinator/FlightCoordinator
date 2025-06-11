import React from "react";

import { Metadata } from "next";

import { LoginForm } from "@/components/page-content/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
