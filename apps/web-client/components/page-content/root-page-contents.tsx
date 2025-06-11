"use client";

import { ArrowLeft, Download, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/base-ui/button";

import { useLoadSampleDataMutation } from "@/hooks/development-hooks";

import { config } from "@/shared/app-config";

const RootPageContents = () => {
  const {
    isPending: isLoadSampleDataLoading,
    isError: loadSampleDataError,
    mutateAsync: loadSampleDataMutation,
  } = useLoadSampleDataMutation();

  const handleLoadSampleData = () => {
    loadSampleDataMutation()
      .then((response) => {
        if (!response || !response.isSuccess || loadSampleDataError) {
          toast("An error ocurred");
          return;
        }
        toast("Loaded sample data successfully.");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  if (loadSampleDataError) {
    toast("An unknown error ocurred. Please try again later.");
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-0.5">
        <span className="font-semibold tracking-tight">Welcome to FlightCoordinator!</span>
        <span className="text-sm text-muted-foreground flex flex-row items-center justify-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5 min-w-3.5 min-h-3.5" />
          <span>You can start by selecting a page from the left sidebar.</span>
        </span>
      </div>
      {config.ENVIRONMENT.IS_DEV && (
        <div className="w-[500px] text-sm border rounded-xl p-4 mt-4 flex flex-col items-start justify-start gap-2">
          <span className="font-semibold">It looks like you are in a dev environment</span>
          <span className="text-muted-foreground">
            You can load some sample data to work with. You may get an error if you already loaded the sample data.
          </span>
          <Button variant="outline" className="w-full" onClick={() => handleLoadSampleData()}>
            {isLoadSampleDataLoading ? (
              <>
                <LoaderCircle className="animate-spin" />
                Loading Sample Data
              </>
            ) : (
              <>
                <Download />
                Load Sample Data
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export { RootPageContents };
