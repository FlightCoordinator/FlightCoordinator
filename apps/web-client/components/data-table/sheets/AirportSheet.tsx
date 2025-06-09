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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base-ui/select";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base-ui/sheet";

import useAirportCreateMutation from "@/hooks/resource/airport/useAirportCreateMutation";
import useAirportUpdateMutation from "@/hooks/resource/airport/useAirportUpdateMutation";

import { getAllValuesOf, getSelectItem, selectItems } from "@/shared/constants/selectItems";
import CountryCodes from "@/shared/enum/countries";
import Enums from "@/shared/enum/enums";
import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dataTransfer";

import {
  invalidEnumValueMessage,
  invalidTimeMessage,
  nonEmptyMessage,
  nonNegativeMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "../constants/validationMessages";
import FormSelect from "../data-components/FormSelect";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface AirportSheetProps {
  airport?: DataTransfer.AirportDTO;
}

const airportSchema = z.object({
  name: z.string().nonempty(nonEmptyMessage),
  iataCode: z
    .string(shouldBeStringMessage)
    .nonempty(nonEmptyMessage)
    .min(3, { message: "IATA Code should be 3 characters long" })
    .max(3, { message: "IATA Code should be 3 characters long" }),
  icaoCode: z
    .string(shouldBeStringMessage)
    .nonempty(nonEmptyMessage)
    .min(4, { message: "IATA Code should be 4 characters long" })
    .max(4, { message: "IATA Code should be 4 characters long" }),
  countryCode: z.enum(getAllValuesOf("CountryCodes"), invalidEnumValueMessage),
  type: z.enum(getAllValuesOf("AirportType"), invalidEnumValueMessage),
  operationStartTime: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage).time(invalidTimeMessage),
  operationStopTime: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage).time(invalidTimeMessage),
  elevation: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  slope: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  possibleNoiseCategory: z.enum(getAllValuesOf("NoiseCategory"), invalidEnumValueMessage),
});

const AirportSheet = ({ airport }: AirportSheetProps) => {
  const form = useForm<z.infer<typeof airportSchema>>({
    resolver: zodResolver(airportSchema),
    defaultValues: {
      name: airport ? airport.name : "",
      iataCode: airport ? airport.iataCode : "",
      icaoCode: airport ? airport.icaoCode : "",
      countryCode: airport ? airport.countryCode : "",
      type: airport ? airport.type : "INTERNATIONAL",
      operationStartTime: airport ? airport.operationStartTime : "",
      operationStopTime: airport ? airport.operationStopTime : "",
      elevation: airport ? airport.elevation : 0,
      slope: airport ? airport.elevation : 0,
      possibleNoiseCategory: airport ? airport.possibleNoiseCategory : "CHAPTER_4",
    },
  });

  const {
    mutateAsync: airportCreateMutation,
    isPending: isAirportCreateLoading,
    error: airportCreateError,
  } = useAirportCreateMutation();
  const {
    mutateAsync: airportUpdateMutation,
    isPending: isAirportUpdateLoading,
    error: airportUpdateError,
  } = useAirportUpdateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof airportSchema>): Promise<void> => {
    airportCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || airportCreateError || airportUpdateError) {
          toast("An error ocurred");
          return;
        }
        toast("Created Successfully");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  const handleUpdateSubmit = async (formData: z.infer<typeof airportSchema>): Promise<void> => {
    airportUpdateMutation({ id: airport!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess) {
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
        <Button variant={airport ? "ghost" : "outline"} size={airport ? "icon" : "default"}>
          {airport ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Airport
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{airport ? "Edit Airport" : "Create a new Airport"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="w-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(airport ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="airportname">Airport Name</Label>
                  <Input
                    id="airportname"
                    className={cn(form.formState.errors.name && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.name && <ErrorLabel>{form.formState.errors.name.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="iataCode"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="iataCode">IATA Code</Label>
                  <Input
                    id="iataCode"
                    className={cn(form.formState.errors.iataCode && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.iataCode && <ErrorLabel>{form.formState.errors.iataCode.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="icaoCode"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="icaoCode">ICAO Code</Label>
                  <Input
                    id="icaoCode"
                    className={cn(form.formState.errors.icaoCode && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.icaoCode && <ErrorLabel>{form.formState.errors.icaoCode.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="countryCode">Country Code</Label>
                  <FormSelect
                    items={selectItems.asArray.CountryCodes.map((code) => ({
                      value: code.value,
                      label: code.value + " - " + code.label,
                    }))}
                    placeholder={
                      airport
                        ? getSelectItem("CountryCodes", airport.countryCode as unknown as keyof typeof CountryCodes)
                            .label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.countryCode}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.countryCode && (
                    <ErrorLabel>{form.formState.errors.countryCode.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="type"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="airportType">Airport Type</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          airport
                            ? getSelectItem("AirportType", airport.type as unknown as keyof typeof Enums.AirportType)
                                .label
                            : "Select..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectItems.asArray.AirportType.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="operationStartTime"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="operationStartTime">Operation Start Time</Label>
                  <Input
                    id="operationStartTime"
                    className={cn(form.formState.errors.operationStartTime && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.operationStartTime && (
                    <ErrorLabel>{form.formState.errors.operationStartTime.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="operationStopTime"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="operationStopTime">Operation Stop Time</Label>
                  <Input
                    id="operationStopTime"
                    className={cn(form.formState.errors.operationStopTime && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.operationStopTime && (
                    <ErrorLabel>{form.formState.errors.operationStopTime.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="elevation"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="elevation">Elevation (in ft)</Label>
                  <Input
                    id="elevation"
                    type="number"
                    className={cn(form.formState.errors.elevation && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.elevation && (
                    <ErrorLabel>{form.formState.errors.elevation.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="slope"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="slope">Slope (As percentage)</Label>
                  <Input
                    id="slope"
                    type="number"
                    className={cn(form.formState.errors.slope && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.slope && <ErrorLabel>{form.formState.errors.slope.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="possibleNoiseCategory"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="possibleNoiseCategory">Possible Noise Category</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          airport
                            ? getSelectItem(
                                "NoiseCategory",
                                airport.possibleNoiseCategory as unknown as keyof typeof Enums.NoiseCategory,
                              ).label
                            : "Select..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectItems.asArray.NoiseCategory.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isAirportUpdateLoading || isAirportCreateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default AirportSheet;
