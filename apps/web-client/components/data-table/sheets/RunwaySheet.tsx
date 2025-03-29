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

import { useToast } from "@/hooks/interface/useToast";
import useRunwayCreateMutation from "@/hooks/resource/runway/useRunwayCreateMutation";
import useRunwayUpdateMutation from "@/hooks/resource/runway/useRunwayUpdateMutation";

import { getAllValuesOf, getSelectItem, selectItems } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";
import { cn } from "@/shared/lib/twUtils";
import Utils from "@/shared/utils";

import DataTransfer from "@/types/dataTransfer";

import {
  invalidEnumValueMessage,
  nonEmptyMessage,
  nonNegativeMessage,
  positiveMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "../constants/validationMessages";
import FormSelect from "../data-components/FormSelect";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface RunwaySheetProps {
  runway?: DataTransfer.RunwayDTO;
}

const runwaySchema = z.object({
  runwayNumber: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  airportId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  length: z.number(shouldBeNumberMessage).positive(positiveMessage),
  width: z.number(shouldBeNumberMessage).positive(positiveMessage),
  surfaceType: z.enum(getAllValuesOf("SurfaceType"), invalidEnumValueMessage),
  maxWeightCapacity: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  hasMarkings: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  hasLighting: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  hasILS: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  hasSafetyArea: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  visualApproachAid: z.enum(getAllValuesOf("VisualApproachAid"), invalidEnumValueMessage),
  altitude: z.number(shouldBeNumberMessage).positive(positiveMessage),
  status: z.enum(getAllValuesOf("RunwayStatus"), invalidEnumValueMessage),
  crosswindLimit: z.number(shouldBeNumberMessage).positive(positiveMessage),
});

const RunwaySheet = ({ runway }: RunwaySheetProps) => {
  const form = useForm<z.infer<typeof runwaySchema>>({
    resolver: zodResolver(runwaySchema),
    defaultValues: {
      runwayNumber: runway ? runway.runwayNumber : "",
      airportId: runway ? runway.airportId : "",
      length: runway ? runway.length : 1,
      width: runway ? runway.width : 1,
      surfaceType: runway ? runway.surfaceType : "",
      maxWeightCapacity: runway ? runway.maxWeightCapacity : 0,
      hasMarkings: runway ? Utils.boolToLabel(String(runway.hasMarkings)) : "true",
      hasLighting: runway ? Utils.boolToLabel(String(runway.hasLighting)) : "true",
      hasILS: runway ? Utils.boolToLabel(String(runway.hasILS)) : "true",
      hasSafetyArea: runway ? Utils.boolToLabel(String(runway.hasSafetyArea)) : "true",
      visualApproachAid: runway ? runway.visualApproachAid : "",
      altitude: runway ? runway.altitude : 1,
      status: runway ? runway.status : "",
      crosswindLimit: runway ? runway.crosswindLimit : 1,
    },
  });

  const { toast } = useToast();

  const {
    mutateAsync: runwayCreateMutation,
    isPending: isRunwayCreateLoading,
    error: runwayCreateError,
  } = useRunwayCreateMutation();
  const {
    mutateAsync: runwayUpdateMutation,
    isPending: isRunwayUpdateLoading,
    error: runwayUpdateError,
  } = useRunwayUpdateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof runwaySchema>): Promise<void> => {
    runwayCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || runwayCreateError) {
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

  const handleUpdateSubmit = async (formData: z.infer<typeof runwaySchema>): Promise<void> => {
    runwayUpdateMutation({ id: runway!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess || runwayUpdateError) {
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
        <Button variant={runway ? "ghost" : "outline"} size={runway ? "icon" : "default"}>
          {runway ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Runway
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{runway ? "Edit Runway" : "Create a new Runway"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(runway ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="runwayNumber"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="runwayNumber">Runway Number</Label>
                  <Input
                    id="runwayNumber"
                    className={cn(form.formState.errors.runwayNumber && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.runwayNumber && (
                    <ErrorLabel>{form.formState.errors.runwayNumber.message}</ErrorLabel>
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
            <Controller
              control={form.control}
              name="length"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="length">Length (in ft)</Label>
                  <Input
                    id="length"
                    type="number"
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
              name="width"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="width">Width (in ft)</Label>
                  <Input
                    id="width"
                    type="number"
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
              name="surfaceType"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="surfaceType">Surface Type</Label>
                  <FormSelect
                    items={selectItems.asArray.SurfaceType}
                    placeholder={
                      runway
                        ? getSelectItem("SurfaceType", runway.surfaceType as unknown as keyof typeof Enums.SurfaceType)
                            .label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.surfaceType}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.width && <ErrorLabel>{form.formState.errors.width.message}</ErrorLabel>}
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
                    type="number"
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
              name="hasMarkings"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasMarkings">Has Markings</Label>
                  <FormSelect
                    items={selectItems.asArray.Boolean}
                    placeholder={runway ? Utils.boolToLabel(String(runway.hasMarkings)) : "Select..."}
                    hasError={!!form.formState.errors.hasMarkings}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasMarkings && (
                    <ErrorLabel>{form.formState.errors.hasMarkings.message}</ErrorLabel>
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
                    placeholder={runway ? Utils.boolToLabel(String(runway.hasLighting)) : "Select..."}
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
              name="hasILS"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasILS">Has ILS</Label>
                  <FormSelect
                    items={selectItems.asArray.Boolean}
                    placeholder={runway ? Utils.boolToLabel(String(runway.hasILS)) : "Select..."}
                    hasError={!!form.formState.errors.hasILS}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasILS && <ErrorLabel>{form.formState.errors.hasILS.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="hasSafetyArea"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasSafetyArea">Has Safety Area</Label>
                  <FormSelect
                    items={selectItems.asArray.Boolean}
                    placeholder={runway ? Utils.boolToLabel(String(runway.hasSafetyArea)) : "Select..."}
                    hasError={!!form.formState.errors.hasSafetyArea}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasSafetyArea && (
                    <ErrorLabel>{form.formState.errors.hasSafetyArea.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="visualApproachAid"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="visualApproachAid">Visual Approach Aid</Label>
                  <FormSelect
                    items={selectItems.asArray.VisulApproachAid}
                    placeholder={
                      runway
                        ? getSelectItem(
                            "VisualApproachAid",
                            runway.visualApproachAid as unknown as keyof typeof Enums.VisualApproachAid,
                          ).label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.visualApproachAid}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.visualApproachAid && (
                    <ErrorLabel>{form.formState.errors.visualApproachAid.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="altitude"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="altitude">Altitude (in ft)</Label>
                  <Input
                    id="altitude"
                    className={cn(form.formState.errors.altitude && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.altitude && <ErrorLabel>{form.formState.errors.altitude.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="status">Status</Label>
                  <FormSelect
                    items={selectItems.asArray.RunwayStatus}
                    placeholder={
                      runway
                        ? getSelectItem("RunwayStatus", runway.status as unknown as keyof typeof Enums.RunwayStatus)
                            .label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.status}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.status && <ErrorLabel>{form.formState.errors.status.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="crosswindLimit"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="crosswindLimit">Crosswind Limit (in kt)</Label>
                  <Input
                    id="crosswindLimit"
                    className={cn(form.formState.errors.crosswindLimit && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.crosswindLimit && (
                    <ErrorLabel>{form.formState.errors.crosswindLimit.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isRunwayCreateLoading || isRunwayUpdateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default RunwaySheet;
