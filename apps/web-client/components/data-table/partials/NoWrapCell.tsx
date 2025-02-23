import React from "react";

import GlobalTypes from "@/types/globals";

const NoWrapCell = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return <span className="text-nowrap">{children}</span>;
};

export default NoWrapCell;
