"use client";

import React from "react";

import { useRouter } from "next/navigation";

const AlgorithmRootPage = () => {
  const router = useRouter();
  React.useEffect(() => router.replace("/app/algorithm/run"));
};

export default AlgorithmRootPage;
