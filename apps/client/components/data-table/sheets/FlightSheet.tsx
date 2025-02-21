"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, PlusCircle } from "lucide-react";
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

import { useToast } from "@/hooks/interface/use-toast";
import useFlightCreateMutation from "@/hooks/resource/flight/useFlightCreateMutation";
import useFlightUpdateMutation from "@/hooks/resource/flight/useFlightUpdateMutation";

import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dto";

import {
  greaterThanZeroMessage,
  requiredMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "../constants/validationMessages";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface FlightSheetProps {
  flight?: DataTransfer.FlightDTO;
}

const flightSchema = z.object({
  passengerCount: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  flightRouteId: z.string(shouldBeStringMessage).nonempty(requiredMessage),
});

const FlightSheet = ({ flight }: FlightSheetProps) => {
  const form = useForm<z.infer<typeof flightSchema>>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      passengerCount: flight ? flight.passengerCount : 0,
      flightRouteId: flight ? flight.flightRouteId : "",
    },
  });

  const { toast } = useToast();

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
          toast({ title: "An error ocurred", description: response.message });
          return;
        }
        toast({ title: "Created Successfully", description: response.message });
      })
      .catch((error) =>
        toast({
          title: "An error ocurred",
          description: error.message,
        }),
      );
  };

  const handleUpdateSubmit = async (formData: z.infer<typeof flightSchema>): Promise<void> => {
    flightUpdateMutation({ id: flight!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess || flightUpdateError) {
          toast({ title: "An error ocurred", description: response.message });
          return;
        }
        toast({ title: "Updated Successfully", description: response.message });
      })
      .catch((error: Error) =>
        toast({
          title: "An error ocurred",
          description: error.message,
        }),
      );
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
              name="flightRouteId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="flightRouteId">Flight Route Id</Label>
                  <Input
                    id="flightRouteId"
                    className={cn(form.formState.errors.flightRouteId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.flightRouteId && (
                    <ErrorLabel>{form.formState.errors.flightRouteId.message}</ErrorLabel>
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

export default FlightSheet;
