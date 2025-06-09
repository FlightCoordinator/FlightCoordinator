import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/base-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base-ui/dialog";
import { Label } from "@/components/base-ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base-ui/select";
import { Separator } from "@/components/base-ui/separator";

import useFlightPlanCreateMutation from "@/hooks/resource/flight-plan/useFlightPlanCreateMutation";

import { nonEmptyMessage } from "../constants/validationMessages";
import SaveButton from "../partials/SaveButton";
import SheetRow from "../sheets/base/SheetRow";

interface FlightPlanDialogProps {
  flightDetails: {
    id: string;
    originAirport: {
      id: string;
      iataCode: string;
      name: string;
      countryCode: string;
    };
    destinationAirport: {
      id: string;
      iataCode: string;
      name: string;
      countryCode: string;
    };
  }[];
}

const flightPlanSchema = z.object({
  id: z.string().nonempty(nonEmptyMessage),
});

const FlightPlanDialog = ({ flightDetails }: FlightPlanDialogProps) => {
  const form = useForm<z.infer<typeof flightPlanSchema>>({
    resolver: zodResolver(flightPlanSchema),
    defaultValues: { id: "" },
  });

  const {
    mutateAsync: flightPlanCreateMutation,
    isPending: isFlightPlanCreateLoading,
    error: flightPlanCreateError,
  } = useFlightPlanCreateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof flightPlanSchema>): Promise<void> => {
    flightPlanCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || flightPlanCreateError) {
          toast("An error ocurred");
          return;
        }
        toast("Created Successfully");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="default" className="h-auto">
          <PlusCircle /> Generate a New Flight Plan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate a New Flight Plan</DialogTitle>
          <DialogDescription>Please select a flight to generate a flight plan for</DialogDescription>
        </DialogHeader>
        <form
          noValidate
          className="w-full flex flex-col items-start justify-start gap-5"
          onSubmit={form.handleSubmit(handleCreateSubmit)}>
          <Controller
            control={form.control}
            name="id"
            render={({ field }) => (
              <SheetRow>
                <Label htmlFor="flightdetails">Flight Details</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full h-auto!">
                    <SelectValue placeholder="Select a flight" />
                  </SelectTrigger>
                  <SelectContent id="flightdetails">
                    {flightDetails.map((details, index) => (
                      <React.Fragment key={details.id}>
                        {index !== 0 && <Separator className="my-1" />}
                        <SelectItem key={details.id} value={details.id}>
                          <div className="flex flex-col items-start justify-center gap-4">
                            <div className="w-full flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                From: {details.originAirport.name} ({details.originAirport.iataCode}) in{" "}
                                {details.originAirport.countryCode}{" "}
                              </span>
                              <span className="text-xs text-muted-foreground truncate">{details.originAirport.id}</span>
                            </div>
                            <div className="w-full flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                To: {details.destinationAirport.name} ({details.destinationAirport.iataCode}) in{" "}
                                {details.destinationAirport.countryCode}
                              </span>
                              <span className="text-xs text-muted-foreground truncate">
                                {details.destinationAirport.id}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <span className="font-semibold">Flight ID:</span> {details.id}
                            </div>
                          </div>
                        </SelectItem>
                      </React.Fragment>
                    ))}
                  </SelectContent>
                </Select>
              </SheetRow>
            )}
          />
          <SaveButton isLoading={isFlightPlanCreateLoading} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FlightPlanDialog;
