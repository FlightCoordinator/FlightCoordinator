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

import useModelCreateMutation from "@/hooks/resource/model/useModelCreateMutation";
import useModelUpdateMutation from "@/hooks/resource/model/useModelUpdateMutation";

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

interface ModelSheetProps {
  model?: DataTransfer.ModelDTO;
}

const modelSchema = z.object({
  manufacturer: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  planeIdentifier: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  modelName: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  certifier: z.enum(getAllValuesOf("Certifier"), invalidEnumValueMessage),
  certificationStatus: z.enum(getAllValuesOf("CertificationStatus"), invalidEnumValueMessage),
  noiseCategory: z.enum(getAllValuesOf("NoiseCategory"), invalidEnumValueMessage),
  fuelCapacity: z.number(shouldBeNumberMessage).positive(positiveMessage),
  fuelEfficiency: z.number(shouldBeNumberMessage).nonnegative(positiveMessage),
  maxPassengerCapacity: z.number(shouldBeNumberMessage).positive(positiveMessage),
  maxCargoCapacity: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  emptyWeight: z.number(shouldBeNumberMessage).positive(positiveMessage),
  tailHeight: z.number(shouldBeNumberMessage).positive(positiveMessage),
  wingspan: z.number(shouldBeNumberMessage).positive(positiveMessage),
  engineType: z.enum(getAllValuesOf("EngineType"), invalidEnumValueMessage),
  engineCount: z.number(shouldBeNumberMessage).positive(positiveMessage),
  thrustPerEngine: z.number(shouldBeNumberMessage).positive(positiveMessage),
  maxCrosswindComp: z.number(shouldBeNumberMessage).positive(positiveMessage),
  requiredRunwayLength: z.number(shouldBeNumberMessage).positive(positiveMessage),
  requiredRunwayWidth: z.number(shouldBeNumberMessage).positive(positiveMessage),
  minRotationRadius: z.number(shouldBeNumberMessage).positive(positiveMessage),
  cruiseSpeed: z.number(shouldBeNumberMessage).positive(positiveMessage),
  maxSpeed: z.number(shouldBeNumberMessage).positive(positiveMessage),
  stallSpeed: z.number(shouldBeNumberMessage).positive(positiveMessage),
  maxAltitude: z.number(shouldBeNumberMessage).positive(positiveMessage),
  climbRate: z.number(shouldBeNumberMessage).positive(positiveMessage),
  descentRate: z.number(shouldBeNumberMessage).positive(positiveMessage),
  maxFlightRange: z.number(shouldBeNumberMessage).positive(positiveMessage),
  hasWeatherRadar: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  hasAutopilot: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  hasFlyByWire: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  hasFireSupression: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
  gpsEnabled: z.enum(getAllValuesOf("Boolean"), invalidEnumValueMessage),
});

const ModelSheet = ({ model }: ModelSheetProps) => {
  const form = useForm<z.infer<typeof modelSchema>>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      manufacturer: model ? model.manufacturer : "",
      planeIdentifier: model ? model.planeIdentifier : "",
      modelName: model ? model.modelName : "",
      certifier: model ? model.certifier : "",
      certificationStatus: model ? model.certificationStatus : "",
      noiseCategory: model ? model.noiseCategory : "",
      fuelCapacity: model ? model.fuelCapacity : 1,
      fuelEfficiency: model ? model.fuelEfficiency : 0,
      maxPassengerCapacity: model ? model.maxPassengerCapacity : 1,
      maxCargoCapacity: model ? model.maxCargoCapacity : 0,
      emptyWeight: model ? model.emptyWeight : 1,
      tailHeight: model ? model.tailHeight : 1,
      wingspan: model ? model.wingspan : 1,
      engineType: model ? model.engineType : "",
      engineCount: model ? model.engineCount : 1,
      thrustPerEngine: model ? model.thrustPerEngine : 1,
      maxCrosswindComp: model ? model.maxCrosswindComp : 1,
      requiredRunwayLength: model ? model.requiredRunwayLength : 1,
      requiredRunwayWidth: model ? model.requiredRunwayWidth : 1,
      minRotationRadius: model ? model.minRotationRadius : 1,
      cruiseSpeed: model ? model.cruiseSpeed : 1,
      maxSpeed: model ? model.maxSpeed : 1,
      stallSpeed: model ? model.stallSpeed : 1,
      maxAltitude: model ? model.maxAltitude : 1,
      climbRate: model ? model.climbRate : 1,
      descentRate: model ? model.descentRate : 1,
      maxFlightRange: model ? model.maxFlightRange : 1,
      hasWeatherRadar: model ? Utils.boolToLabel(String(model.hasWeatherRadar)) : "true",
      hasAutopilot: model ? Utils.boolToLabel(String(model.hasAutopilot)) : "true",
      hasFlyByWire: model ? Utils.boolToLabel(String(model.hasFlyByWire)) : "true",
      hasFireSupression: model ? Utils.boolToLabel(String(model.hasFireSupression)) : "true",
      gpsEnabled: model ? Utils.boolToLabel(String(model.gpsEnabled)) : "true",
    },
  });

  const {
    mutateAsync: modelCreateMutation,
    isPending: isModelCreateLoading,
    error: modelCreateError,
  } = useModelCreateMutation();
  const {
    mutateAsync: modelUpdateMutation,
    isPending: isModelUpdateLoading,
    error: modelUpdateError,
  } = useModelUpdateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof modelSchema>): Promise<void> => {
    modelCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || modelCreateError) {
          toast("An error ocurred");
          return;
        }
        toast("Created Successfully");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  const handleUpdateSubmit = async (formData: z.infer<typeof modelSchema>): Promise<void> => {
    modelUpdateMutation({ id: model!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess || modelUpdateError) {
          toast("An error ocurred");
          return;
        }
        toast("Created Successfully");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={model ? "ghost" : "outline"} size={model ? "icon" : "default"}>
          {model ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Model
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{model ? "Edit Model" : "Create a new Model"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(model ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    className={cn(form.formState.errors.manufacturer && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.manufacturer && (
                    <ErrorLabel>{form.formState.errors.manufacturer.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="planeIdentifier"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="planeIdentifier">Plane Identifier</Label>
                  <Input
                    id="planeIdentifier"
                    className={cn(form.formState.errors.planeIdentifier && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.planeIdentifier && (
                    <ErrorLabel>{form.formState.errors.planeIdentifier.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="modelName"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="modelName">Model Name</Label>
                  <Input
                    id="modelName"
                    className={cn(form.formState.errors.modelName && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.modelName && (
                    <ErrorLabel>{form.formState.errors.modelName.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="certifier"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="certifier">Certifier</Label>
                  <FormSelect
                    items={selectItems.asArray.Certifier}
                    placeholder={
                      model
                        ? getSelectItem("Certifier", model.certifier as unknown as keyof typeof Enums.Certifier).label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.certifier}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.certifier && (
                    <ErrorLabel>{form.formState.errors.certifier.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="certificationStatus"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="certificationStatus">Certification Status</Label>
                  <FormSelect
                    items={selectItems.asArray.CertificationStatus}
                    placeholder={
                      model
                        ? getSelectItem(
                            "CertificationStatus",
                            model.certificationStatus as unknown as keyof typeof Enums.CertificationStatus,
                          ).label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.certificationStatus}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.certificationStatus && (
                    <ErrorLabel>{form.formState.errors.certificationStatus.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="noiseCategory"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="noiseCategory">Noise Category</Label>
                  <FormSelect
                    items={selectItems.asArray.NoiseCategory}
                    placeholder={
                      model
                        ? getSelectItem(
                            "NoiseCategory",
                            model.noiseCategory as unknown as keyof typeof Enums.NoiseCategory,
                          ).label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.noiseCategory}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.noiseCategory && (
                    <ErrorLabel>{form.formState.errors.noiseCategory.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="fuelCapacity"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="fuelCapacity">Fuel Capacity (in gal)</Label>
                  <Input
                    id="fuelCapacity"
                    type="number"
                    className={cn(form.formState.errors.fuelCapacity && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.fuelCapacity && (
                    <ErrorLabel>{form.formState.errors.fuelCapacity.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="fuelEfficiency"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="fuelEfficiency">Fuel Efficiency (lbs of fuel burned per passenger per NM)</Label>
                  <Input
                    id="fuelEfficiency"
                    type="number"
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
              name="maxPassengerCapacity"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxPassengerCapacity">Max Passenger Capacity</Label>
                  <Input
                    id="maxPassengerCapacity"
                    type="number"
                    className={cn(form.formState.errors.maxPassengerCapacity && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxPassengerCapacity && (
                    <ErrorLabel>{form.formState.errors.maxPassengerCapacity.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxCargoCapacity"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxCargoCapacity">Max Cargo Capacity (in lbs)</Label>
                  <Input
                    id="maxCargoCapacity"
                    type="number"
                    className={cn(form.formState.errors.maxCargoCapacity && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxCargoCapacity && (
                    <ErrorLabel>{form.formState.errors.maxCargoCapacity.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="emptyWeight"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="emptyWeight">Empty Weight (in lbs)</Label>
                  <Input
                    id="emptyWeight"
                    type="number"
                    className={cn(form.formState.errors.emptyWeight && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.emptyWeight && (
                    <ErrorLabel>{form.formState.errors.emptyWeight.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="tailHeight"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="tailHeight">Tail Height (in ft)</Label>
                  <Input
                    id="tailHeight"
                    type="number"
                    className={cn(form.formState.errors.tailHeight && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.tailHeight && (
                    <ErrorLabel>{form.formState.errors.tailHeight.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="wingspan"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="wingspan">Wingspan (in ft)</Label>
                  <Input
                    id="wingspan"
                    type="number"
                    className={cn(form.formState.errors.wingspan && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.wingspan && <ErrorLabel>{form.formState.errors.wingspan.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="engineType"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="engineType">Engine Type</Label>
                  <FormSelect
                    items={selectItems.asArray.EngineType}
                    placeholder={
                      model
                        ? getSelectItem("EngineType", model.engineType as unknown as keyof typeof Enums.EngineType)
                            .label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.engineType}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.engineType && (
                    <ErrorLabel>{form.formState.errors.engineType.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="engineCount"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="engineCount">Engine Count</Label>
                  <Input
                    id="engineCount"
                    type="number"
                    className={cn(form.formState.errors.engineCount && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.engineCount && (
                    <ErrorLabel>{form.formState.errors.engineCount.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="thrustPerEngine"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="thrustPerEngine">Thrust Per Engine (in lbf)</Label>
                  <Input
                    id="thrustPerEngine"
                    type="number"
                    className={cn(form.formState.errors.thrustPerEngine && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.thrustPerEngine && (
                    <ErrorLabel>{form.formState.errors.thrustPerEngine.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxCrosswindComp"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxCrosswindComp">Max Crosswind Comp (in kt)</Label>
                  <Input
                    id="maxCrosswindComp"
                    type="number"
                    className={cn(form.formState.errors.maxCrosswindComp && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxCrosswindComp && (
                    <ErrorLabel>{form.formState.errors.maxCrosswindComp.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="requiredRunwayLength"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="requiredRunwayLength">Required Runway Length (in ft)</Label>
                  <Input
                    id="requiredRunwayLength"
                    type="number"
                    className={cn(form.formState.errors.requiredRunwayLength && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.requiredRunwayLength && (
                    <ErrorLabel>{form.formState.errors.requiredRunwayLength.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="requiredRunwayWidth"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="requiredRunwayWidth">Required Runway Width (in ft)</Label>
                  <Input
                    id="requiredRunwayWidth"
                    type="number"
                    className={cn(form.formState.errors.requiredRunwayWidth && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.requiredRunwayWidth && (
                    <ErrorLabel>{form.formState.errors.requiredRunwayWidth.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="minRotationRadius"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="minRotationRadius">Min Rotation Radius (in ft)</Label>
                  <Input
                    id="minRotationRadius"
                    type="number"
                    className={cn(form.formState.errors.minRotationRadius && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.minRotationRadius && (
                    <ErrorLabel>{form.formState.errors.minRotationRadius.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="cruiseSpeed"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="cruiseSpeed">Cruise Speed (in kt)</Label>
                  <Input
                    id="cruiseSpeed"
                    type="number"
                    className={cn(form.formState.errors.cruiseSpeed && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.cruiseSpeed && (
                    <ErrorLabel>{form.formState.errors.cruiseSpeed.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxSpeed"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxSpeed">Max Speed (in kt)</Label>
                  <Input
                    id="maxSpeed"
                    type="number"
                    className={cn(form.formState.errors.maxSpeed && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxSpeed && <ErrorLabel>{form.formState.errors.maxSpeed.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="stallSpeed"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="stallSpeed">Stall Speed (in kt)</Label>
                  <Input
                    id="stallSpeed"
                    type="number"
                    className={cn(form.formState.errors.stallSpeed && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.stallSpeed && (
                    <ErrorLabel>{form.formState.errors.stallSpeed.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxAltitude"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxAltitude">Max Altitude (in ft)</Label>
                  <Input
                    id="maxAltitude"
                    type="number"
                    className={cn(form.formState.errors.maxAltitude && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.maxAltitude && (
                    <ErrorLabel>{form.formState.errors.maxAltitude.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="climbRate"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="climbRate">Climb Rate (in ft/min)</Label>
                  <Input
                    id="climbRate"
                    type="number"
                    className={cn(form.formState.errors.climbRate && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.climbRate && (
                    <ErrorLabel>{form.formState.errors.climbRate.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="descentRate"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="descentRate">Descent Rate (in ft/min)</Label>
                  <Input
                    id="descentRate"
                    type="number"
                    className={cn(form.formState.errors.descentRate && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.descentRate && (
                    <ErrorLabel>{form.formState.errors.descentRate.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="maxFlightRange"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="maxFlightRange">Max Flight Range (in NM)</Label>
                  <Input
                    id="maxFlightRange"
                    type="number"
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
              name="hasWeatherRadar"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasWeatherRadar">Has Weather Radar</Label>
                  <FormSelect
                    items={[
                      { label: "Yes", value: "true" },
                      { label: "No", value: "false" },
                    ]}
                    placeholder={model ? Utils.boolToLabel(String(model.hasWeatherRadar)) : "Select..."}
                    hasError={!!form.formState.errors.hasWeatherRadar}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasWeatherRadar && (
                    <ErrorLabel>{form.formState.errors.hasWeatherRadar.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="hasAutopilot"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasAutopilot">Has Autopilot</Label>
                  <FormSelect
                    items={[
                      { label: "Yes", value: "true" },
                      { label: "No", value: "false" },
                    ]}
                    placeholder={model ? Utils.boolToLabel(String(model.hasAutopilot)) : "Select..."}
                    hasError={!!form.formState.errors.hasAutopilot}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasAutopilot && (
                    <ErrorLabel>{form.formState.errors.hasAutopilot.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="hasFlyByWire"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasFlyByWire">Has Fly By Wire</Label>
                  <FormSelect
                    items={[
                      { label: "Yes", value: "true" },
                      { label: "No", value: "false" },
                    ]}
                    placeholder={model ? Utils.boolToLabel(String(model.hasFlyByWire)) : "Select..."}
                    hasError={!!form.formState.errors.hasFlyByWire}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasFlyByWire && (
                    <ErrorLabel>{form.formState.errors.hasFlyByWire.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="hasFireSupression"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="hasFireSupression">Has Fire Supression</Label>
                  <FormSelect
                    items={[
                      { label: "Yes", value: "true" },
                      { label: "No", value: "false" },
                    ]}
                    placeholder={model ? Utils.boolToLabel(String(model.hasFireSupression)) : "Select..."}
                    hasError={!!form.formState.errors.hasFireSupression}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.hasFireSupression && (
                    <ErrorLabel>{form.formState.errors.hasFireSupression.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="gpsEnabled"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="gpsEnabled">GPS Enabled</Label>
                  <FormSelect
                    items={[
                      { label: "Yes", value: "true" },
                      { label: "No", value: "false" },
                    ]}
                    placeholder={model ? Utils.boolToLabel(String(model.gpsEnabled)) : "Select..."}
                    hasError={!!form.formState.errors.gpsEnabled}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.gpsEnabled && (
                    <ErrorLabel>{form.formState.errors.gpsEnabled.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isModelCreateLoading || isModelUpdateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default ModelSheet;
