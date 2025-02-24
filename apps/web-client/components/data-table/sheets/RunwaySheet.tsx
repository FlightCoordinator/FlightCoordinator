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

import DataTransfer from "@/types/dto";

import {
  greaterThanZeroMessage,
  invalidEnumValueMessage,
  requiredMessage,
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
  length: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  width: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  surfaceType: z.enum(getAllValuesOf("RunwaySurfaceType"), invalidEnumValueMessage),
  maxWeightCapacity: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  orientation: z.string(shouldBeStringMessage).nonempty(requiredMessage),
  airportId: z.string(shouldBeStringMessage).nonempty(requiredMessage),
});

const RunwaySheet = ({ runway }: RunwaySheetProps) => {
  const form = useForm<z.infer<typeof runwaySchema>>({
    resolver: zodResolver(runwaySchema),
    defaultValues: {
      length: runway ? runway.length : 1,
      width: runway ? runway.width : 1,
      surfaceType: runway ? runway.surfaceType : "Concrete",
      maxWeightCapacity: runway ? runway.maxWeightCapacity : 1,
      orientation: runway ? runway.orientation : "",
      airportId: runway ? runway.airportId : "",
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
              name="length"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="length">Length</Label>
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
              name="width"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="width">Width</Label>
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
              name="surfaceType"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="surfaceType">Surface Type</Label>
                  <FormSelect
                    items={selectItems.asArray.RunwaySurfaceType}
                    placeholder={
                      runway
                        ? getSelectItem(
                            "RunwaySurfaceType",
                            runway.surfaceType as unknown as keyof typeof Enums.RunwaySurfaceType,
                          ).label
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
                  <Label htmlFor="maxWeightCapacity">Max Weight Capacity</Label>
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
              name="orientation"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="orientation">Orientation</Label>
                  <Input
                    id="orientation"
                    className={cn(form.formState.errors.orientation && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.orientation && (
                    <ErrorLabel>{form.formState.errors.orientation.message}</ErrorLabel>
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
            <SaveButton isLoading={isRunwayCreateLoading || isRunwayUpdateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default RunwaySheet;
