import React from "react";

import { CircleOff } from "lucide-react";

import BaseOverlay from "./BaseOverlay";

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

export default NotFoundOverlay;
