import { ArrowLeft } from "lucide-react";

const AppRootPage = () => {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-0.5">
        <span className="font-semibold tracking-tight">Welcome to FlightCoordinator!</span>
        <span className="text-sm text-muted-foreground flex flex-row items-center justify-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5 min-w-3.5 min-h-3.5" />
          <span>You can start by selecting a page from the left sidebar.</span>
        </span>
      </div>
    </div>
  );
};

export default AppRootPage;
