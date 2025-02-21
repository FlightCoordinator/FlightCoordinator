import React from "react";

import { Puzzle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <Puzzle className="w-8 h-8 min-h-8 min-w-8" />
        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="font-semibold tracking-tight">Not found</span>
          <span className="text-sm text-muted-foreground">We couldn&apos;t find this page.</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
