"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pen, PlusCircle, Save } from "lucide-react";
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

import { useToast } from "@/hooks/interface/use-toast";
import useAirportCreateMutation from "@/hooks/resource/airport/useAirportCreateMutation";
import useAirportUpdateMutation from "@/hooks/resource/airport/useAirportUpdateMutation";

import labelValueArrays from "@/shared/constants/labelValueArrays";
import { cn } from "@/shared/lib/twUtils";
import { getAllValuesOf, getLabelValueObject } from "@/shared/utils/enumUtils";

import DataTransfer from "@/types/dto";

import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface AirportSheetProps {
  airport?: DataTransfer.AirportDTO;
}

const airportSchema = z.object({
  name: z.string().nonempty({ message: "This field is required" }),
  iataCode: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(3, { message: "IATA Code should be 3 characters long" })
    .max(3, { message: "IATA Code should be 3 characters long" }),
  icaoCode: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(4, { message: "IATA Code should be 4 characters long" })
    .max(4, { message: "IATA Code should be 4 characters long" }),
  countryCode: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(3, { message: "Country Code should be 3 characters long" })
    .max(3, { message: "Country Code should be 3 characters long" }),
  type: z.enum(getAllValuesOf("AirportType")).default("INTERNATIONAL"),
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
    const response = await airportCreateMutation(formData);
    if (!response.isSuccess || airportCreateError || airportUpdateError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Created Successfully", description: response.message });
    return;
  };

  const handleUpdateSubmit = async (formData: z.infer<typeof airportSchema>): Promise<void> => {
    const response = await airportUpdateMutation({ id: airport!.id, ...formData });
    if (!response.isSuccess) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Updated Successfully", description: response.message });
    return;
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
            className="-full flex flex-col items-start justify-start gap-5"
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
                  <Input
                    id="countryCode"
                    className={cn(form.formState.errors.countryCode && "border-destructive")}
                    {...field}
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
                        placeholder={airport ? getLabelValueObject("AirportType", airport.type).label : "Select..."}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {labelValueArrays.AirportType.map((item) => (
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
            <span className="text-muted-foreground">Only editable fields are shown.</span>
            <Button className="w-full" type="submit">
              {isAirportUpdateLoading || isAirportCreateLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Processing
                </>
              ) : (
                <>
                  <Save /> Save Changes
                </>
              )}
            </Button>
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default AirportSheet;
