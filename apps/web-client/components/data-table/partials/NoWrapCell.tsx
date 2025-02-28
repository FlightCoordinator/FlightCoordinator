import React from "react";

import { cn } from "@/shared/lib/twUtils";

import GlobalTypes from "@/types/globals";

interface NoWrapCellProps extends GlobalTypes.BaseWrapperProps {
  className?: string;
}

const NoWrapCell = ({ children, className }: NoWrapCellProps) => {
  return <span className={cn("text-nowrap", className)}>{children}</span>;
};

export default NoWrapCell;
