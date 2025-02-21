import React from "react";

import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/base-ui/button";

interface SaveButtonProps {
  isLoading: boolean;
}

const SaveButton = ({ isLoading }: SaveButtonProps) => {
  return (
    <>
      <span className="text-muted-foreground">Only editable fields are shown.</span>
      <Button className="w-full" type="submit">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> Processing
          </>
        ) : (
          <>
            <Save /> Save Changes
          </>
        )}
      </Button>
    </>
  );
};

export default SaveButton;
