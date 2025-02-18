import React from "react";

import { LoaderCircle } from "lucide-react";

import BaseOverlay from "./BaseOverlay";

const LoadingOverlay = () => {
  return (
    <BaseOverlay>
      <div className="flex flex-col items-center justify-center gap-2">
        <LoaderCircle className="w-8 h-8 min-h-8 min-w-8 animate-spin" />
        <span className="font-semibold tracking-tight">Loading the data...</span>
      </div>
    </BaseOverlay>
  );
};

export default LoadingOverlay;
