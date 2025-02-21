import React from "react";

import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      <Loader className="w-6 h-6 min-h-6 min-w-6 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingPage;
