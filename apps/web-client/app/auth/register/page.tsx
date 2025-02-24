import React from "react";

import { Metadata } from "next";

import RegisterForm from "@/components/page-content/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
