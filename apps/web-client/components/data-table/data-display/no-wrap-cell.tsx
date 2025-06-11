import React from "react";

import { cn } from "@/shared/lib/twUtils";

import type { GlobalTypes } from "@/types/globals";

interface NoWrapCellProps extends GlobalTypes.BaseWrapperProps {
  className?: string;
}

const NoWrapCell = ({ children, className }: NoWrapCellProps) => {
  return (
    <span className={cn("text-nowrap flex flex-row items-center justify-start gap-2", className)}>{children}</span>
  );
};

export { NoWrapCell };
