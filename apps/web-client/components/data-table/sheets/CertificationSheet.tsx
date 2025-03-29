"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import dayjs from "dayjs";
import { Pen, PlusCircle } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/base-ui/button";
import { Input } from "@/components/base-ui/input";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base-ui/sheet";
import { Textarea } from "@/components/base-ui/textarea";

import { useToast } from "@/hooks/interface/useToast";
import useCertificationCreateMutation from "@/hooks/resource/certification/useCertificationCreateMutation";
import useCertificationUpdateMutation from "@/hooks/resource/certification/useCertificationUpdateMutation";

import { getAllValuesOf, getSelectItem, selectItems } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";
import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dataTransfer";

import {
  invalidDateMessage,
  invalidEnumValueMessage,
  nonEmptyMessage,
  positiveMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "../constants/validationMessages";
import DatePicker from "../data-components/DatePicker";
import FormSelect from "../data-components/FormSelect";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface CertificationSheetProps {
  certification?: DataTransfer.CertificationDTO;
}

const certificationSchema = z.object({
  name: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  certificationNumber: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  issuer: z.enum(getAllValuesOf("Certifier"), invalidEnumValueMessage),
  expirationDate: z.date(invalidDateMessage),
  validityPeriod: z.number(shouldBeNumberMessage).positive(positiveMessage),
  description: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  assignedCrewMemberId: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
});

const CertificationSheet = ({ certification }: CertificationSheetProps) => {
  const form = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: certification ? certification.name : "",
      certificationNumber: certification ? certification.certificationNumber : "",
      issuer: certification ? certification.issuer : "",
      expirationDate: certification ? dayjs(certification.expirationDate).toDate() : dayjs().toDate(),
      validityPeriod: certification ? certification.validityPeriod : 0,
      description: certification ? certification.description : "",
      assignedCrewMemberId: certification ? certification.assignedCrewMemberId : "",
    },
  });

  const { toast } = useToast();

  const {
    mutateAsync: certificationCreateMutation,
    isPending: isCertificationCreateLoading,
    error: certificationCreateError,
  } = useCertificationCreateMutation();
  const {
    mutateAsync: certificationUpdateMutation,
    isPending: isCertificationUpdateLoading,
    error: certificationUpdateError,
  } = useCertificationUpdateMutation();

  const handleCreateSubmit = (formData: z.infer<typeof certificationSchema>): void => {
    certificationCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || certificationCreateError || certificationUpdateError) {
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

  const handleUpdateSubmit = (formData: z.infer<typeof certificationSchema>): void => {
    certificationUpdateMutation({ id: certification!.id, ...formData })
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
        <Button variant={certification ? "ghost" : "outline"} size={certification ? "icon" : "default"}>
          {certification ? (
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
          <SheetTitle>{certification ? "Edit Certification" : "Create a new Certification"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="h-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(certification ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="certificationname">Certification Name</Label>
                  <Input
                    id="certificationname"
                    className={cn(form.formState.errors.name && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.name && <ErrorLabel>{form.formState.errors.name.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="certificationNumber"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="certificationnumber">Certification Number</Label>
                  <Input
                    id="certificationnumber"
                    className={cn(form.formState.errors.certificationNumber && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.certificationNumber && (
                    <ErrorLabel>{form.formState.errors.certificationNumber.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="issuer"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="issuer">Issuer</Label>
                  <FormSelect
                    items={selectItems.asArray.Certifier}
                    placeholder={
                      certification
                        ? getSelectItem("Certifier", certification.issuer as unknown as keyof typeof Enums.Certifier)
                            .label
                        : "Select..."
                    }
                    hasError={!!form.formState.errors.issuer}
                    onchange={field.onChange}
                    value={field.value}
                  />
                  {form.formState.errors.issuer && <ErrorLabel>{form.formState.errors.issuer.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="expirationdate">Expiration Date</Label>
                  <DatePicker onchange={field.onChange} value={field.value} />
                  {form.formState.errors.expirationDate && (
                    <ErrorLabel>{form.formState.errors.expirationDate.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="validityPeriod"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="validityperiod">Validity Period (in months)</Label>
                  <Input
                    id="validityperiod"
                    type="number"
                    className={cn(form.formState.errors.validityPeriod && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.validityPeriod && (
                    <ErrorLabel>{form.formState.errors.validityPeriod.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="validityPeriod"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="validityperiod">Validity Period</Label>
                  <Input
                    id="validityperiod"
                    type="number"
                    className={cn(form.formState.errors.validityPeriod && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.validityPeriod && (
                    <ErrorLabel>{form.formState.errors.validityPeriod.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    placeholder="Enter certification description..."
                    className={cn(form.formState.errors.description && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.description && (
                    <ErrorLabel>{form.formState.errors.description.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="assignedCrewMemberId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="assignedCrewMemberId">Assigned Crew Member Id</Label>
                  <Input
                    id="assignedCrewMemberId"
                    className={cn(form.formState.errors.assignedCrewMemberId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.assignedCrewMemberId && (
                    <ErrorLabel>{form.formState.errors.assignedCrewMemberId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isCertificationUpdateLoading || isCertificationCreateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default CertificationSheet;
