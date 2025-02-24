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
import useVehicleCreateMutation from "@/hooks/resource/vehicle/useVehicleCreateMutation";
import useVehicleUpdateMutation from "@/hooks/resource/vehicle/useVehicleUpdateMutation";

import { getAllValuesOf, getSelectItem, selectItems } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";
import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dto";

import {
  greaterThanZeroMessage,
  invalidDateMessage,
  invalidEnumValueMessage,
  requiredMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "../constants/validationMessages";
import DatePicker from "../data-components/DatePicker";
import FormSelect from "../data-components/FormSelect";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface VehicleSheetProps {
  vehicle?: DataTransfer.VehicleDTO;
}

const vehicleSchema = z.object({
  type: z.enum(getAllValuesOf("GroundVehicleType"), invalidEnumValueMessage),
  vehicleCode: z.string(shouldBeStringMessage).nonempty(requiredMessage),
  capacity: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  availability: z.enum(getAllValuesOf("GroundVehicleAvailability"), invalidEnumValueMessage),
  maintenanceDue: z.date(invalidDateMessage),
  airportId: z.string(shouldBeStringMessage).nonempty(requiredMessage),
});

const VehicleSheet = ({ vehicle }: VehicleSheetProps) => {
  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      type: vehicle ? vehicle.type : "",
      vehicleCode: vehicle ? vehicle.vehicleCode : "",
      capacity: vehicle ? vehicle.capacity : 1,
      availability: vehicle ? vehicle.availability : "",
      maintenanceDue: vehicle ? vehicle.maintenanceDue : dayjs().toDate(),
      airportId: vehicle ? vehicle.airportId : "",
    },
  });

  const { toast } = useToast();

  const {
    mutateAsync: vehicleCreateMutation,
    isPending: isVehicleCreateLoading,
    error: vehicleCreateError,
  } = useVehicleCreateMutation();
  const {
    mutateAsync: vehicleUpdateMutation,
    isPending: isVehicleUpdateLoading,
    error: vehicleUpdateError,
  } = useVehicleUpdateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof vehicleSchema>): Promise<void> => {
    vehicleCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || vehicleCreateError || vehicleUpdateError) {
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

  const handleUpdateSubmit = async (formData: z.infer<typeof vehicleSchema>): Promise<void> => {
    vehicleUpdateMutation({ id: vehicle!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess) {
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
        <Button variant={vehicle ? "ghost" : "outline"} size={vehicle ? "icon" : "default"}>
          {vehicle ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Vehicle
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{vehicle ? "Edit Vehicle" : "Create a new Vehicle"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(vehicle ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="type"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="type">Type</Label>
                  <FormSelect
                    items={selectItems.asArray.GroundVehicleType}
                    placeholder={
                      vehicle
                        ? getSelectItem(
                            "GroundVehicleType",
                            vehicle.type as unknown as keyof typeof Enums.GroundVehicleType,
                          ).label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.type}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.type && <ErrorLabel>{form.formState.errors.type.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="vehicleCode"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="vehicleCode">Vehicle Code</Label>
                  <Input
                    id="vehicleCode"
                    className={cn(form.formState.errors.vehicleCode && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.vehicleCode && (
                    <ErrorLabel>{form.formState.errors.vehicleCode.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    className={cn(form.formState.errors.capacity && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.capacity && <ErrorLabel>{form.formState.errors.capacity.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="availability"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="availability">Availability</Label>
                  <FormSelect
                    items={selectItems.asArray.GroundVehicleAvailability}
                    placeholder={
                      vehicle
                        ? getSelectItem(
                            "GroundVehicleAvailability",
                            vehicle.availability as unknown as keyof typeof Enums.GroundVehicleAvailability,
                          ).label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.availability}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.availability && (
                    <ErrorLabel>{form.formState.errors.availability.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maintenanceDue"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maintenanceDue">Maintenance Due</Label>
                  <DatePicker onchange={field.onChange} value={field.value} />
                  {form.formState.errors.maintenanceDue && (
                    <ErrorLabel>{form.formState.errors.maintenanceDue.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="airportId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="airportId">Airport Id</Label>
                  <Input
                    id="airportId"
                    className={cn(form.formState.errors.airportId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.airportId && (
                    <ErrorLabel>{form.formState.errors.airportId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isVehicleUpdateLoading || isVehicleCreateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default VehicleSheet;
