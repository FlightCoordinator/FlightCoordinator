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
import useCrewCreateMutation from "@/hooks/resource/crew/useCrewCreateMutation";
import useCrewUpdateMutation from "@/hooks/resource/crew/useCrewUpdateMutation";

import { getAllValuesOf, getSelectItem, selectItems } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";
import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dataTransfer";

import {
  invalidEmailMessage,
  invalidEnumValueMessage,
  nonEmptyMessage,
  nonNegativeMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "../constants/validationMessages";
import FormSelect from "../data-components/FormSelect";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface CrewSheetProps {
  crew?: DataTransfer.CrewDTO;
}

const crewSchema = z.object({
  fullName: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  email: z.string(shouldBeStringMessage).email(invalidEmailMessage).nonempty(nonEmptyMessage),
  phoneNumber: z.string(shouldBeNumberMessage).nonempty(nonEmptyMessage),
  role: z.enum(getAllValuesOf("CrewMemberRole"), invalidEnumValueMessage),
  totalFlightHours: z.number(shouldBeNumberMessage).nonnegative(nonNegativeMessage),
  baseAirportId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  currentAirportId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  status: z.enum(getAllValuesOf("CrewMemberStatus"), invalidEnumValueMessage),
});

const CrewSheet = ({ crew }: CrewSheetProps) => {
  const form = useForm<z.infer<typeof crewSchema>>({
    resolver: zodResolver(crewSchema),
    defaultValues: {
      fullName: crew ? crew.fullName : "",
      email: crew ? crew.email : "",
      phoneNumber: crew ? crew.phoneNumber : "",
      role: crew ? crew.role : "Captain",
      totalFlightHours: crew ? crew.totalFlightHours : 0,
      baseAirportId: crew ? crew.baseAirportId : "",
      status: crew ? crew.status : "",
    },
  });

  const [countryCode, setCountryCode] = React.useState<string>(selectItems.asObject.CountryCodes.US.value);
  const { toast } = useToast();

  const {
    mutateAsync: crewCreateMutation,
    isPending: isCrewCreateLoading,
    error: crewCreateError,
  } = useCrewCreateMutation();
  const {
    mutateAsync: crewUpdateMutation,
    isPending: isCrewUpdateLoading,
    error: crewUpdateError,
  } = useCrewUpdateMutation();

  const handleCreateSubmit = (formData: z.infer<typeof crewSchema>): void => {
    crewCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || crewCreateError || crewUpdateError) {
          toast({ title: "An error ocurred", description: response.message });
          return;
        }
        toast({ title: "Created Successfully", description: response.message });
      })
      .catch((error: Error) =>
        toast({
          title: "An error ocurred",
          description: error.message,
        }),
      );
  };

  const handleUpdateSubmit = (formData: z.infer<typeof crewSchema>): void => {
    crewUpdateMutation({ id: crew!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess) {
          toast({ title: "An error ocurred", description: response.message });
          return;
        }
        toast({ title: "Updated Successfully", description: response.message });
        return;
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
        <Button variant={crew ? "ghost" : "outline"} size={crew ? "icon" : "default"}>
          {crew ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Certification
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{crew ? "Edit Crew Member" : "Create a new Crew Member"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="h-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(crew ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    className={cn(form.formState.errors.fullName && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.fullName && <ErrorLabel>{form.formState.errors.fullName.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    className={cn(form.formState.errors.email && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.email && <ErrorLabel>{form.formState.errors.email.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="w-full flex flex-row items-center justify-center gap-1.5">
                    <Select onValueChange={(value) => setCountryCode(value)} defaultValue={countryCode}>
                      <SelectTrigger
                        className={cn(form.formState.errors.phoneNumber && "border-destructive", "w-[68px]")}>
                        <SelectValue placeholder={countryCode} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {selectItems.asArray.CountryCodes.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.value} - {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      id="phoneNumber"
                      className={cn(form.formState.errors.phoneNumber && "border-destructive")}
                      {...field}
                    />
                    {/* <Input
                      international
                      country={countryCode as CountryCode}
                      inputComponent={InputComponent}
                      placeholder={
                        crew
                          ? parsePhoneNumberWithError(crew.phoneNumber, countryCode as CountryCode)
                          : "Enter a phone number..."
                      }
                      onChange={field.onChange}
                      value={field.value}
                    /> */}
                  </div>
                  {form.formState.errors.phoneNumber && (
                    <ErrorLabel>{form.formState.errors.phoneNumber.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="role"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="role">Role</Label>
                  <FormSelect
                    items={selectItems.asArray.CrewMemberRole}
                    placeholder={crew ? getSelectItem("CrewMemberRole", crew.role).label : "Select..."}
                    hasError={!!form.formState.errors.role}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.role && <ErrorLabel>{form.formState.errors.role.message}</ErrorLabel>}
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
              name="baseAirportId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="baseAirportId">Base Airport ID</Label>
                  <Input
                    id="baseAirportId"
                    className={cn(form.formState.errors.baseAirportId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.baseAirportId && (
                    <ErrorLabel>{form.formState.errors.baseAirportId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="availability">Availability</Label>
                  <FormSelect
                    items={selectItems.asArray.CrewMemberStatus}
                    placeholder={
                      crew
                        ? getSelectItem(
                            "CrewMemberStatus",
                            crew.status as unknown as keyof typeof Enums.CrewMemberStatus,
                          ).label
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
            <SaveButton isLoading={isCrewCreateLoading || isCrewUpdateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default CrewSheet;
