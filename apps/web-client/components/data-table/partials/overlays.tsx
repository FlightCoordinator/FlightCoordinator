import React from "react";

import { CircleOff, CloudAlert, Loader } from "lucide-react";

import type { GlobalTypes } from "@/types/globals";

const BaseOverlay = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return <div className="w-full h-full flex-1 flex items-center justify-center">{children}</div>;
};

const LoadingOverlay = () => {
  return (
    <BaseOverlay>
      <div className="flex flex-col items-center justify-center gap-2">
        <Loader className="w-6 h-6 min-h-6 min-w-6 animate-spin" />
        <span className="font-semibold tracking-tight">Loading the data...</span>
      </div>
    </BaseOverlay>
  );
};

const NotFoundOverlay = () => {
  return (
    <BaseOverlay>
      <div className="flex flex-col items-center justify-center gap-2">
        <CircleOff className="w-8 h-8 min-h-8 min-w-8" />
        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="font-semibold tracking-tight">Not found</span>
          <span className="text-sm text-muted-foreground">We couldn&apos;t find any data</span>
        </div>
      </div>
    </BaseOverlay>
  );
};

const ErrorOverlay = () => {
  return (
    <BaseOverlay>
      <div className="flex flex-col items-center justify-center gap-2">
        <CloudAlert className="w-8 h-8 min-h-8 min-w-8" />
        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="font-semibold tracking-tight">An error ocurred</span>
          <span className="text-sm text-muted-foreground">You can try refreshing the page or logging in again.</span>
        </div>
      </div>
    </BaseOverlay>
  );
};

export { LoadingOverlay, NotFoundOverlay, ErrorOverlay };
