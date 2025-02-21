"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
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
import usePlaneCreateMutation from "@/hooks/resource/plane/usePlaneCreateMutation";
import usePlaneUpdateMutation from "@/hooks/resource/plane/usePlaneUpdateMutation";

import { getAllValuesOf, getSelectItem, selectItems } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";
import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dto";

import {
  greaterThanZeroMessage,
  invalidEnumValueMessage,
  nonNegativeMessage,
  requiredMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
  invalidDateMessage,
} from "../constants/validationMessages";
import DatePicker from "../data-components/DatePicker";
import FormSelect from "../data-components/FormSelect";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface PlaneSheetProps {
  plane?: DataTransfer.PlaneDTO;
}

const planeSchema = z.object({
  model: z.string(shouldBeStringMessage).nonempty(requiredMessage),
  registrationNumber: z.string(shouldBeStringMessage).nonempty(requiredMessage),
  passengerCapacity: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  fuelEfficiency: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  maxFlightRange: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  lastMaintenance: z.date(invalidDateMessage),
  totalFlightHours: z.number(shouldBeStringMessage).nonnegative(nonNegativeMessage),
  maxTakeoffWeight: z.number(shouldBeStringMessage).positive(greaterThanZeroMessage),
  shortestRunwayLengthRequired: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  shortestRunwayWidthRequired: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  planeStatus: z.enum(getAllValuesOf("PlaneAvailability"), invalidEnumValueMessage).default("AVAILABLE"),
  currentLocationId: z.string(shouldBeStringMessage).nonempty(requiredMessage),
  aircraftOperator: z.string(shouldBeStringMessage).nonempty(requiredMessage),
});

const PlaneSheet = ({ plane }: PlaneSheetProps) => {
  const form = useForm<z.infer<typeof planeSchema>>({
    resolver: zodResolver(planeSchema),
    defaultValues: {
      model: plane ? plane.model : "",
      registrationNumber: plane ? plane.registrationNumber : "",
      passengerCapacity: plane ? plane.passengerCapacity : 0,
      fuelEfficiency: plane ? plane.fuelEfficiency : 1,
      maxFlightRange: plane ? plane.maxFlightRange : 1,
      lastMaintenance: plane ? plane.lastMaintenance : dayjs().toDate(),
      totalFlightHours: plane ? plane.totalFlightHours : 0,
      maxTakeoffWeight: plane ? plane.maxTakeoffWeight : 1,
      shortestRunwayLengthRequired: plane ? plane.shortestRunwayLengthRequired : 1,
      shortestRunwayWidthRequired: plane ? plane.shortestRunwayWidthRequired : 1,
      planeStatus: plane ? plane.planeStatus : "Available,",
      currentLocationId: plane ? plane.currentLocationId : "",
      aircraftOperator: plane ? plane.aircraftOperator : "",
    },
  });

  const { toast } = useToast();

  const {
    mutateAsync: planeCreateMutation,
    isPending: isPlaneCreateLoading,
    error: planeCreateError,
  } = usePlaneCreateMutation();
  const {
    mutateAsync: planeUpdateMutation,
    isPending: isPlaneUpdateLoading,
    error: planeUpdateError,
  } = usePlaneUpdateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof planeSchema>): Promise<void> => {
    planeCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || planeCreateError) {
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

  const handleUpdateSubmit = async (formData: z.infer<typeof planeSchema>): Promise<void> => {
    planeUpdateMutation({ id: plane!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess || planeUpdateError) {
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
        <Button variant={plane ? "ghost" : "outline"} size={plane ? "icon" : "default"}>
          {plane ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Plane
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{plane ? "Edit Plane" : "Create a new Plane"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(plane ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="model"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" className={cn(form.formState.errors.model && "border-destructive")} {...field} />
                  {form.formState.errors.model && <ErrorLabel>{form.formState.errors.model.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    className={cn(form.formState.errors.registrationNumber && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.registrationNumber && (
                    <ErrorLabel>{form.formState.errors.registrationNumber.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="passengerCapacity"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="passengerCapacity">Passenger Capacity</Label>
                  <Input
                    id="passengerCapacity"
                    className={cn(form.formState.errors.passengerCapacity && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.passengerCapacity && (
                    <ErrorLabel>{form.formState.errors.passengerCapacity.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="fuelEfficiency"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="fuelEfficiency">Fuel Efficiency</Label>
                  <Input
                    id="fuelEfficiency"
                    className={cn(form.formState.errors.fuelEfficiency && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.fuelEfficiency && (
                    <ErrorLabel>{form.formState.errors.fuelEfficiency.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxFlightRange"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxFlightRange">Max Flight Range</Label>
                  <Input
                    id="maxFlightRange"
                    className={cn(form.formState.errors.maxFlightRange && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxFlightRange && (
                    <ErrorLabel>{form.formState.errors.maxFlightRange.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="lastMaintenance"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="lastMaintenance">Last Maintenance</Label>
                  <DatePicker onchange={field.onChange} value={field.value} />
                  {form.formState.errors.lastMaintenance && (
                    <ErrorLabel>{form.formState.errors.lastMaintenance.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="totalFlightHours"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="totalFlightHours">Total Flight Hours</Label>
                  <Input
                    id="totalFlightHours"
                    className={cn(form.formState.errors.totalFlightHours && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.totalFlightHours && (
                    <ErrorLabel>{form.formState.errors.totalFlightHours.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxTakeoffWeight"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxTakeoffWeight">Max Takeoff Weight</Label>
                  <Input
                    id="maxTakeoffWeight"
                    className={cn(form.formState.errors.maxTakeoffWeight && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxTakeoffWeight && (
                    <ErrorLabel>{form.formState.errors.maxTakeoffWeight.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="shortestRunwayLengthRequired"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="shortestRunwayLengthRequired">Shortest Runway Length Required</Label>
                  <Input
                    id="shortestRunwayLengthRequired"
                    className={cn(form.formState.errors.shortestRunwayLengthRequired && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.shortestRunwayLengthRequired && (
                    <ErrorLabel>{form.formState.errors.shortestRunwayLengthRequired.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="shortestRunwayWidthRequired"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="shortestRunwayWidthRequired">Shortest Runway Width Required</Label>
                  <Input
                    id="shortestRunwayWidthRequired"
                    className={cn(form.formState.errors.shortestRunwayWidthRequired && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.shortestRunwayWidthRequired && (
                    <ErrorLabel>{form.formState.errors.shortestRunwayWidthRequired.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="planeStatus"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="planeStatus">Plane Status</Label>
                  <FormSelect
                    items={selectItems.asArray.PlaneAvailability}
                    placeholder={
                      plane
                        ? getSelectItem(
                            "PlaneAvailability",
                            plane.planeStatus as unknown as keyof typeof Enums.PlaneAvailability,
                          ).label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.planeStatus}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.planeStatus && (
                    <ErrorLabel>{form.formState.errors.planeStatus.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="currentLocationId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="currentLocationId">Current Location Id</Label>
                  <Input
                    id="currentLocationId"
                    className={cn(form.formState.errors.currentLocationId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.currentLocationId && (
                    <ErrorLabel>{form.formState.errors.currentLocationId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="aircraftOperator"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="aircraftOperator">Aircraft Operator</Label>
                  <Input
                    id="aircraftOperator"
                    className={cn(form.formState.errors.aircraftOperator && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.aircraftOperator && (
                    <ErrorLabel>{form.formState.errors.aircraftOperator.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isPlaneCreateLoading || isPlaneUpdateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default PlaneSheet;
