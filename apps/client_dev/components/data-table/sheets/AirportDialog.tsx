import React from "react";

import { Pen, PlusCircle, Save } from "lucide-react";

import DataTransfer from "@/types/dto";

import { Button } from "../../base-ui/button";
import { Input } from "../../base-ui/input";
import { Label } from "../../base-ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../base-ui/sheet";

interface AirportSheetProps {
  airport?: DataTransfer.AirportDTO;
}

const AirportSheet = ({ airport }: AirportSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={airport ? "ghost" : "outline"} size={airport ? "icon" : "default"}>
          {airport ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Account
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{airport ? "Edit Airport" : "Create a new Airport"}</SheetTitle>
          <SheetDescription>You can fill or edit the field below then click save.</SheetDescription>
        </SheetHeader>
        <div>
          <Label htmlFor="airportname">Airport Name</Label>
          <Input id="airportname" defaultValue={airport ? airport.name : ""} />
        </div>
        <span className="text-muted-foreground">Only editable fields are shown.</span>
        <SheetFooter>
          <Button className="w-full">
            <Save /> Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AirportSheet;
