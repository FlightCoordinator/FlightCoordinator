"use client";

import { ArrowLeft, Download, LoaderCircle } from "lucide-react";

import { Button } from "@/components/base-ui/button";

import useLoadSampleDataMutation from "@/hooks/development/useLoadSampleDataMutation";
import { useToast } from "@/hooks/interface/useToast";

import { config } from "@/shared/appConfig";

const AppRootPageContents = () => {
  const isDev: boolean = config.ENVIRONMENT === "dev";

  const {
    isPending: isLoadSampleDataLoading,
    isError: loadSampleDataError,
    mutateAsync: loadSampleDataMutation,
  } = useLoadSampleDataMutation();

  const { toast } = useToast();

  const handleLoadSampleData = () => {
    loadSampleDataMutation()
      .then((response) => {
        if (!response || !response.isSuccess || loadSampleDataError) {
          toast({ title: "An error ocurred", description: response.message });
          return;
        }
        toast({ title: "Loaded sample data successfully.", description: response.message });
      })
      .catch((error) => toast({ title: "An error ocurred", description: error.message }));
  };

  if (loadSampleDataError) {
    toast({
      title: "An Error Ocurred",
      description: "An unknown error ocurred. Please try again later.",
    });
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
      {isDev && (
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

export default AppRootPageContents;
