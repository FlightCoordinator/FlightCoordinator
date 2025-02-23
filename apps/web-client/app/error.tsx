"use client";

import React from "react";

import { PlugZap } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="w-dvw h-dvh flex-1 flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <PlugZap className="w-8 h-8 min-h-8 min-w-8" />
        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="font-semibold tracking-tight">An error ocurred</span>
          <span className="text-sm text-muted-foreground">You can try refreshing the page.</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
