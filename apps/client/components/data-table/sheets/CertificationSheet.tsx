import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import dayjs from "dayjs";
import { Loader2, Pen, PlusCircle, Save } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/base-ui/button";
import { Input } from "@/components/base-ui/input";
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
import { Textarea } from "@/components/base-ui/textarea";

import { useToast } from "@/hooks/interface/use-toast";
import useCertificationCreateMutation from "@/hooks/resource/certification/useCertificationCreateMutation";
import useCertificationUpdateMutation from "@/hooks/resource/certification/useCertificationUpdateMutation";

import Enums from "@/shared/constants/enums";
import labelValueArrays from "@/shared/constants/labelValueArrays";
import { cn } from "@/shared/lib/twUtils";
import { getAllValuesOf, getLabelValueObject } from "@/shared/utils/enumUtils";

import DataTransfer from "@/types/dto";

import DatePicker from "../partials/DatePicker";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface CertificationSheetProps {
  certification?: DataTransfer.CertificationDTO;
}

const certificationSchema = z.object({
  name: z.string().nonempty(),
  certificationNumber: z.number(),
  issuer: z.enum(getAllValuesOf("CertificationIssuer")),
  issuingCountry: z.enum(getAllValuesOf("CertificationIssuingCountry")),
  expirationDate: z.date(),
  validityPeriod: z.number().positive(),
  assignableRole: z.enum(getAllValuesOf("CrewRole")),
  description: z.string().nonempty(),
  assignedCrewMember: z.string().nonempty(),
});

const CertificationSheet = ({ certification }: CertificationSheetProps) => {
  const form = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: certification ? certification.name : "",
      certificationNumber: certification ? certification.certificationNumber : 0,
      issuer: certification ? certification.issuer : "",
      issuingCountry: certification ? certification.issuingCountry : "",
      expirationDate: certification ? dayjs(certification.expirationDate).toDate() : dayjs().toDate(),
      validityPeriod: certification ? certification.validityPeriod : 0,
      assignableRole: certification ? certification.assignableRole : "",
      description: certification ? certification.description : "",
      assignedCrewMember: certification ? certification.assignedCrewMember : "",
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

  const handleCreateSubmit = async (formData: z.infer<typeof certificationSchema>): Promise<void> => {
    const response = await certificationCreateMutation(formData);
    if (!response.isSuccess || certificationCreateError || certificationUpdateError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Created Successfully", description: response.message });
    return;
  };

  const handleUpdateSubmit = async (formData: z.infer<typeof certificationSchema>): Promise<void> => {
    const response = await certificationUpdateMutation({ id: certification!.id, ...formData });
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
        <Button variant={certification ? "ghost" : "outline"} size={certification ? "icon" : "default"}>
          {certification ? (
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
                    type="number"
                    className={cn(form.formState.errors.certificationNumber && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          certification
                            ? getLabelValueObject("CertificationIssuer", certification.issuer).label
                            : "Select..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {labelValueArrays.CertificationIssuer.map((item) => (
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
              name="issuingCountry"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="issuingcountry">Issuing Country</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          certification
                            ? getLabelValueObject(
                                "CertificationIssuingCountry",
                                certification.issuingCountry as unknown as keyof typeof Enums.CertificationIssuingCountry,
                              ).label
                            : "Select..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {labelValueArrays.CertificationIssuingCountry.map((item) => (
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
              name="assignableRole"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="assignablerole">Assignable Role</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          certification
                            ? getLabelValueObject("CrewRole", certification.assignableRole).label
                            : "Select..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {labelValueArrays.CrewRole.map((item) => (
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
              name="assignedCrewMember"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="assignedcrewmember">Assigned Crew Member</Label>
                  <Input
                    id="assignedcrewmember"
                    className={cn(form.formState.errors.assignedCrewMember && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.assignedCrewMember && (
                    <ErrorLabel>{form.formState.errors.assignedCrewMember.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <span className="text-muted-foreground">Only editable fields are shown.</span>
            <Button className="w-full" type="submit">
              {isCertificationUpdateLoading || isCertificationCreateLoading ? (
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

export default CertificationSheet;
