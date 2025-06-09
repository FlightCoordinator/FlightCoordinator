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

import useTaxiwayCreateMutation from "@/hooks/resource/taxiway/useTaxiwayCreateMutation";
import useTaxiwayUpdateMutation from "@/hooks/resource/taxiway/useTaxiwayUpdateMutation";

import { getAllValuesOf, selectItems } from "@/shared/constants/selectItems";
import { cn } from "@/shared/lib/twUtils";
import Utils from "@/shared/utils";

import DataTransfer from "@/types/dataTransfer";

import {
  invalidEnumValueMessage,
  nonEmptyMessage,
  positiveMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "../constants/validationMessages";
import FormSelect from "../data-components/FormSelect";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface TaxiwaySheetProps {
  taxiway?: DataTransfer.TaxiwayDTO;
}

const taxiwaySchema = z.object({
  name: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  airportId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  loadCapacity: z.number(shouldBeNumberMessage).positive(positiveMessage),
  hasHoldingPoint: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  hasHighSpeedExit: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  width: z.number(shouldBeNumberMessage).positive(positiveMessage),
  length: z.number(shouldBeNumberMessage).positive(positiveMessage),
  maxTurningRadius: z.number(shouldBeNumberMessage).positive(positiveMessage),
  maxWeightCapacity: z.number(shouldBeNumberMessage).positive(positiveMessage),
  hasLighting: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  hasSignage: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  connectedRunwayId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
});

const TaxiwaySheet = ({ taxiway }: TaxiwaySheetProps) => {
  const form = useForm<z.infer<typeof taxiwaySchema>>({
    resolver: zodResolver(taxiwaySchema),
    defaultValues: {
      name: taxiway ? taxiway.name : "",
      airportId: taxiway ? taxiway.airportId : "",
      loadCapacity: taxiway ? taxiway.loadCapacity : 1,
      hasHoldingPoint: taxiway ? Utils.boolToLabel(String(taxiway.hasHoldingPoint)) : "",
      hasHighSpeedExit: taxiway ? Utils.boolToLabel(String(taxiway.hasHighSpeedExit)) : "",
      width: taxiway ? taxiway.width : 1,
      length: taxiway ? taxiway.length : 1,
      maxTurningRadius: taxiway ? taxiway.maxTurningRadius : 1,
      maxWeightCapacity: taxiway ? taxiway.maxWeightCapacity : 1,
      hasLighting: taxiway ? Utils.boolToLabel(String(taxiway.hasLighting)) : "true",
      hasSignage: taxiway ? Utils.boolToLabel(String(taxiway.hasSignage)) : "true",
      connectedRunwayId: taxiway ? taxiway.connectedRunwayId : "",
    },
  });

  const {
    mutateAsync: taxiwayCreateMutation,
    isPending: isTaxiwayCreateLoading,
    error: taxiwayCreateError,
  } = useTaxiwayCreateMutation();
  const {
    mutateAsync: taxiwayUpdateMutation,
    isPending: isTaxiwayUpdateLoading,
    error: taxiwayUpdateError,
  } = useTaxiwayUpdateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof taxiwaySchema>): Promise<void> => {
    taxiwayCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || taxiwayCreateError) {
          toast("An error ocurred");
          return;
        }
        toast("Created Successfully");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  const handleUpdateSubmit = async (formData: z.infer<typeof taxiwaySchema>): Promise<void> => {
    taxiwayUpdateMutation({ id: taxiway!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess || taxiwayUpdateError) {
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
        <Button variant={taxiway ? "ghost" : "outline"} size={taxiway ? "icon" : "default"}>
          {taxiway ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Taxiway
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{taxiway ? "Edit Taxiway" : "Create a new Taxiway"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(taxiway ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" className={cn(form.formState.errors.name && "border-destructive")} {...field} />
                  {form.formState.errors.name && <ErrorLabel>{form.formState.errors.name.message}</ErrorLabel>}
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
            <Controller
              control={form.control}
              name="loadCapacity"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="loadCapacity">Load Capacity (in lbs)</Label>
                  <Input
                    id="loadCapacity"
                    className={cn(form.formState.errors.loadCapacity && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.loadCapacity && (
                    <ErrorLabel>{form.formState.errors.loadCapacity.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="hasHoldingPoint"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasHoldingPoint">Has Holding Point</Label>
                  <FormSelect
                    items={selectItems.asArray.Boolean}
                    placeholder={taxiway ? Utils.boolToLabel(String(taxiway.hasHoldingPoint)) : "Select..."}
                    hasError={!!form.formState.errors.hasHoldingPoint}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasHoldingPoint && (
                    <ErrorLabel>{form.formState.errors.hasHoldingPoint.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="hasHighSpeedExit"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasHighSpeedExit">Has High Speed Exit</Label>
                  <FormSelect
                    items={selectItems.asArray.Boolean}
                    placeholder={taxiway ? Utils.boolToLabel(String(taxiway.hasHighSpeedExit)) : "Select..."}
                    hasError={!!form.formState.errors.hasHighSpeedExit}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasHighSpeedExit && (
                    <ErrorLabel>{form.formState.errors.hasHighSpeedExit.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="width"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="width">Width (in ft)</Label>
                  <Input
                    id="width"
                    className={cn(form.formState.errors.width && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.width && <ErrorLabel>{form.formState.errors.width.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="length"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="length">Length (in ft)</Label>
                  <Input
                    id="length"
                    className={cn(form.formState.errors.length && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.length && <ErrorLabel>{form.formState.errors.length.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxTurningRadius"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxTurningRadius">Max Turning Radius (in ft)</Label>
                  <Input
                    id="maxTurningRadius"
                    className={cn(form.formState.errors.maxTurningRadius && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxTurningRadius && (
                    <ErrorLabel>{form.formState.errors.maxTurningRadius.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxWeightCapacity"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxWeightCapacity">Max Weight Capacity (in lbs)</Label>
                  <Input
                    id="maxWeightCapacity"
                    className={cn(form.formState.errors.maxWeightCapacity && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxWeightCapacity && (
                    <ErrorLabel>{form.formState.errors.maxWeightCapacity.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="hasLighting"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasLighting">Has Lighting</Label>
                  <FormSelect
                    items={selectItems.asArray.Boolean}
                    placeholder={taxiway ? Utils.boolToLabel(String(taxiway.hasLighting)) : "Select..."}
                    hasError={!!form.formState.errors.hasLighting}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasLighting && (
                    <ErrorLabel>{form.formState.errors.hasLighting.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="hasSignage"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasSignage">Has Signage</Label>
                  <FormSelect
                    items={selectItems.asArray.Boolean}
                    placeholder={taxiway ? Utils.boolToLabel(String(taxiway.hasSignage)) : "Select..."}
                    hasError={!!form.formState.errors.hasSignage}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasSignage && (
                    <ErrorLabel>{form.formState.errors.hasSignage.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="connectedRunwayId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="connectedRunwayId">Connected Runway Id</Label>
                  <Input
                    id="connectedRunwayId"
                    className={cn(form.formState.errors.connectedRunwayId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.connectedRunwayId && (
                    <ErrorLabel>{form.formState.errors.connectedRunwayId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isTaxiwayCreateLoading || isTaxiwayUpdateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default TaxiwaySheet;
