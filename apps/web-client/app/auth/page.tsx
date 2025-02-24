"use client";

import React from "react";

import { useRouter } from "next/navigation";

const AuthRootPage = () => {
  const router = useRouter();
  React.useEffect(() => router.replace("/auth/login"));
};

export default AuthRootPage;
