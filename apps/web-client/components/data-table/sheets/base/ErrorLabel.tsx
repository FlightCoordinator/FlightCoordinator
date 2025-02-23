import React from "react";

import GlobalTypes from "@/types/globals";

const ErrorLabel = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return <span className="text-xs text-destructive">{children}</span>;
};

export default ErrorLabel;
