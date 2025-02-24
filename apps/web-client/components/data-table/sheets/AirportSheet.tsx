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

import { useToast } from "@/hooks/interface/useToast";
import useAirportCreateMutation from "@/hooks/resource/airport/useAirportCreateMutation";
import useAirportUpdateMutation from "@/hooks/resource/airport/useAirportUpdateMutation";

import { getAllValuesOf, getSelectItem, selectItems } from "@/shared/constants/selectItems";
import CountryCodes from "@/shared/enum/countries";
import Enums from "@/shared/enum/enums";
import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dto";

import { invalidEnumValueMessage, requiredMessage, shouldBeStringMessage } from "../constants/validationMessages";
import FormSelect from "../data-components/FormSelect";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface AirportSheetProps {
  airport?: DataTransfer.AirportDTO;
}

const airportSchema = z.object({
  name: z.string().nonempty(requiredMessage),
  iataCode: z
    .string(shouldBeStringMessage)
    .nonempty(requiredMessage)
    .min(3, { message: "IATA Code should be 3 characters long" })
    .max(3, { message: "IATA Code should be 3 characters long" }),
  icaoCode: z
    .string(shouldBeStringMessage)
    .nonempty(requiredMessage)
    .min(4, { message: "IATA Code should be 4 characters long" })
    .max(4, { message: "IATA Code should be 4 characters long" }),
  countryCode: z.enum(getAllValuesOf("CountryCodes"), invalidEnumValueMessage),
  type: z.enum(getAllValuesOf("AirportType"), invalidEnumValueMessage).default("INTERNATIONAL"),
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
    },
  });

  const { toast } = useToast();

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

  const handleUpdateSubmit = async (formData: z.infer<typeof airportSchema>): Promise<void> => {
    airportUpdateMutation({ id: airport!.id, ...formData })
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
                        ? getSelectItem("CountryCodes", airport.countryCode as keyof typeof CountryCodes).label
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
            <SaveButton isLoading={isAirportUpdateLoading || isAirportCreateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default AirportSheet;
