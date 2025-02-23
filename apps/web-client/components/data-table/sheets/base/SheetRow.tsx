import React from "react";

import GlobalTypes from "@/types/globals";

const SheetRow = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return <div className="w-full flex flex-col items-start justify-start gap-1">{children}</div>;
};

export default SheetRow;
