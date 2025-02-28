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

import { useToast } from "@/hooks/interface/useToast";
import usePlaneCreateMutation from "@/hooks/resource/plane/usePlaneCreateMutation";
import usePlaneUpdateMutation from "@/hooks/resource/plane/usePlaneUpdateMutation";

import { getAllValuesOf, getSelectItem, selectItems } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";
import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dataTransfer";

import {
  invalidDateMessage,
  invalidEnumValueMessage,
  nonEmptyMessage,
  nonNegativeMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
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
  modelId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  tailNumber: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  nextMaintenanceDate: z.date(invalidDateMessage),
  cyclesSinceLastMaintenance: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  retirementDate: z.date(invalidDateMessage),
  engineHours: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  currentWearLevel: z
    .number(shouldBeNumberMessage)
    .nonnegative(nonNegativeMessage)
    .max(100, { message: "This value should be between 0-100" }),
  totalFlightHours: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  fuelAmount: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  planeStatus: z.enum(getAllValuesOf("PlaneStatus"), invalidEnumValueMessage),
  currentLocationId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  aircraftOperator: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
});

const PlaneSheet = ({ plane }: PlaneSheetProps) => {
  const form = useForm<z.infer<typeof planeSchema>>({
    resolver: zodResolver(planeSchema),
    defaultValues: {
      modelId: plane ? plane.modelId : "",
      tailNumber: plane ? plane.tailNumber : "",
      nextMaintenanceDate: plane ? plane.nextMaintenanceDate : dayjs().toDate(),
      cyclesSinceLastMaintenance: plane ? plane.cyclesSinceLastMaintenance : 0,
      retirementDate: plane ? plane.retirementDate : dayjs().toDate(),
      engineHours: plane ? plane.engineHours : 0,
      currentWearLevel: plane ? plane.currentWearLevel : 0,
      totalFlightHours: plane ? plane.totalFlightHours : 0,
      fuelAmount: plane ? plane.fuelAmount : 0,
      planeStatus: plane ? plane.planeStatus : "",
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
              name="modelId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="modelId">Model Id</Label>
                  <Input
                    id="modelId"
                    className={cn(form.formState.errors.modelId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.modelId && <ErrorLabel>{form.formState.errors.modelId.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="tailNumber"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="tailNumber">Tail Number</Label>
                  <Input
                    id="tailNumber"
                    className={cn(form.formState.errors.tailNumber && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.tailNumber && (
                    <ErrorLabel>{form.formState.errors.tailNumber.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="nextMaintenanceDate"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="nextMaintenanceDate">Next Maintenance Date</Label>
                  <DatePicker onchange={field.onChange} value={field.value} />
                  {form.formState.errors.nextMaintenanceDate && (
                    <ErrorLabel>{form.formState.errors.nextMaintenanceDate.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="cyclesSinceLastMaintenance"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="fuelEfficiency">Cycles Since Last Maintenance</Label>
                  <Input
                    id="cyclesSinceLastMaintenance"
                    type="number"
                    className={cn(form.formState.errors.cyclesSinceLastMaintenance && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.cyclesSinceLastMaintenance && (
                    <ErrorLabel>{form.formState.errors.cyclesSinceLastMaintenance.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="retirementDate"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="retirementDate">Retirement Date</Label>
                  <DatePicker onchange={field.onChange} value={field.value} />
                  {form.formState.errors.retirementDate && (
                    <ErrorLabel>{form.formState.errors.retirementDate.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="engineHours"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="engineHours">Engine Hours</Label>
                  <Input
                    id="engineHours"
                    type="number"
                    className={cn(form.formState.errors.engineHours && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.engineHours && (
                    <ErrorLabel>{form.formState.errors.engineHours.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="currentWearLevel"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="currentWearLevel">Current Wear Level</Label>
                  <Input
                    id="currentWearLevel"
                    type="number"
                    className={cn(form.formState.errors.currentWearLevel && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.currentWearLevel && (
                    <ErrorLabel>{form.formState.errors.currentWearLevel.message}</ErrorLabel>
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
                    type="number"
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
              name="fuelAmount"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="fuelAmount">Fuel Amount</Label>
                  <Input
                    id="fuelAmount"
                    type="number"
                    className={cn(form.formState.errors.fuelAmount && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.fuelAmount && (
                    <ErrorLabel>{form.formState.errors.fuelAmount.message}</ErrorLabel>
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
                    items={selectItems.asArray.PlaneStatus}
                    placeholder={
                      plane
                        ? getSelectItem("PlaneStatus", plane.planeStatus as unknown as keyof typeof Enums.PlaneStatus)
                            .label
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
