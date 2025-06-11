"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/base-ui/button";
import { Input } from "@/components/base-ui/input";
import { Label } from "@/components/base-ui/label";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base-ui/sheet";

import { SaveButton } from "@/components/data-table/data-controls/save-button";

import { ErrorLabel } from "@/components/sheets/base/error-label";
import { SheetRow } from "@/components/sheets/base/sheet-row";
import {
  invalidTimeMessage,
  nonEmptyMessage,
  nonNegativeMessage,
  positiveMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "@/components/sheets/validation-messages";

import { useFlightCreateMutation, useFlightUpdateMutation } from "@/hooks/resources/flight-hooks";

import { cn } from "@/shared/lib/twUtils";

import type { DataTransfer } from "@/types/dataTransfer";

interface FlightSheetProps {
  flight?: DataTransfer.FlightDTO;
}

const flightSchema = z.object({
  passengerCount: z.number(shouldBeNumberMessage).positive(positiveMessage),
  cargoWeight: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  originAirportId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  destinationAirportId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  distance: z.number(shouldBeNumberMessage).positive(positiveMessage),
  estimatedTakeoffTime: z.string(shouldBeStringMessage).time(invalidTimeMessage).nonempty(nonEmptyMessage),
  estimatedLandingTime: z.string(shouldBeStringMessage).time(invalidTimeMessage).nonempty(nonEmptyMessage),
  estimatedFlightDuration: z.number(shouldBeNumberMessage).positive(positiveMessage),
});

const FlightSheet = ({ flight }: FlightSheetProps) => {
  const form = useForm<z.infer<typeof flightSchema>>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      passengerCount: flight ? flight.passengerCount : 1,
      cargoWeight: flight ? flight.cargoWeight : 0,
      originAirportId: flight ? flight.originAirportId : "",
      destinationAirportId: flight ? flight.destinationAirportId : "",
      distance: flight ? flight.distance : 1,
      estimatedTakeoffTime: flight ? flight.estimatedTakeoffTime : "",
      estimatedLandingTime: flight ? flight.estimatedLandingTime : "",
      estimatedFlightDuration: flight ? flight.estimatedFlightDuration : 1,
    },
  });

  const {
    mutateAsync: flightCreateMutation,
    isPending: isFlightCreateLoading,
    error: flightCreateError,
  } = useFlightCreateMutation();
  const {
    mutateAsync: flightUpdateMutation,
    isPending: isFlightUpdateLoading,
    error: flightUpdateError,
  } = useFlightUpdateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof flightSchema>): Promise<void> => {
    flightCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || flightCreateError) {
          toast("An error ocurred");
          return;
        }
        toast("Created Successfully");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  const handleUpdateSubmit = async (formData: z.infer<typeof flightSchema>): Promise<void> => {
    flightUpdateMutation({ id: flight!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess || flightUpdateError) {
          toast("An error ocurred");
          return;
        }
        toast("Updated Successfully");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={flight ? "ghost" : "outline"} size={flight ? "icon" : "default"}>
          {flight ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Flight
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{flight ? "Edit Flight" : "Create a new Flight"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(flight ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="passengerCount"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="passengerCount">Passenger Count</Label>
                  <Input
                    id="passengerCount"
                    type="number"
                    className={cn(form.formState.errors.passengerCount && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.passengerCount && (
                    <ErrorLabel>{form.formState.errors.passengerCount.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="cargoWeight"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="cargoWeight">Cargo Weight (in lbs)</Label>
                  <Input
                    id="cargoWeight"
                    type="number"
                    className={cn(form.formState.errors.cargoWeight && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.cargoWeight && (
                    <ErrorLabel>{form.formState.errors.cargoWeight.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="originAirportId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="originAirportId">Origin Airport Id</Label>
                  <Input
                    id="originAirportId"
                    className={cn(form.formState.errors.originAirportId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.originAirportId && (
                    <ErrorLabel>{form.formState.errors.originAirportId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="destinationAirportId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="destinationAirportId">Destination Airport Id</Label>
                  <Input
                    id="destinationAirportId"
                    className={cn(form.formState.errors.destinationAirportId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.destinationAirportId && (
                    <ErrorLabel>{form.formState.errors.destinationAirportId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="distance"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="distance">Distance (in NM)</Label>
                  <Input
                    id="distance"
                    type="number"
                    className={cn(form.formState.errors.distance && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.distance && <ErrorLabel>{form.formState.errors.distance.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="estimatedTakeoffTime"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="estimatedTakeoffTime">Estimated Takeoff Time</Label>
                  <Input
                    id="estimatedTakeoffTime"
                    className={cn(form.formState.errors.estimatedTakeoffTime && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.estimatedTakeoffTime && (
                    <ErrorLabel>{form.formState.errors.estimatedTakeoffTime.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="estimatedLandingTime"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="estimatedLandingTime">Estimated Landing Time</Label>
                  <Input
                    id="estimatedLandingTime"
                    className={cn(form.formState.errors.estimatedLandingTime && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.estimatedLandingTime && (
                    <ErrorLabel>{form.formState.errors.estimatedLandingTime.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="estimatedFlightDuration"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="estimatedFlightDuration">Estimated Flight Duration (in mins)</Label>
                  <Input
                    id="estimatedFlightDuration"
                    type="number"
                    className={cn(form.formState.errors.estimatedFlightDuration && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.estimatedFlightDuration && (
                    <ErrorLabel>{form.formState.errors.estimatedFlightDuration.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isFlightCreateLoading || isFlightUpdateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export { FlightSheet };
