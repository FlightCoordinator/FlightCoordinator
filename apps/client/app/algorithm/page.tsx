"use client";

import React from "react";

import { redirect } from "next/navigation";

const AlgorithmRootPage = () => React.useEffect(() => redirect("/algorithm/run"));

export default AlgorithmRootPage;
