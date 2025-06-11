"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/base-ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/base-ui/card";
import { Input } from "@/components/base-ui/input";
import { Label } from "@/components/base-ui/label";

import { ErrorLabel } from "@/components/sheets/base/error-label";
import { SheetRow as FormRow } from "@/components/sheets/base/sheet-row";
import { invalidEmailMessage, nonEmptyMessage, shouldBeStringMessage } from "@/components/sheets/validation-messages";

import { useRegisterMutation } from "@/hooks/auth-hooks";

import { cn } from "@/shared/lib/twUtils";

const registerSchema = z.object({
  fullName: z.string(shouldBeStringMessage).nonempty(nonEmptyMessage),
  email: z.string(shouldBeStringMessage).email(invalidEmailMessage).nonempty(nonEmptyMessage),
  password: z
    .string(shouldBeStringMessage)
    .nonempty(nonEmptyMessage)
    .min(8, { message: "Password should be at least 8 characters long." }),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: registerMutation, isPending: isRegisterPending, error: registerError } = useRegisterMutation();

  const handleSubmit = async (formData: z.infer<typeof registerSchema>): Promise<void> => {
    registerMutation(formData)
      .then((response) => {
        if (!response.isSuccess || registerError) {
          toast("An error ocurred");
          return;
        }
        toast("Registered in successfully");
      })
      .catch((error) => toast("An error ocurred: " + error));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Image src="/images/logo.png" alt="FlightCoordinator Logo" width={80} height={80} />
      <Card>
        <CardHeader className="items-center">
          <CardTitle className="text-xl">Hello There!</CardTitle>
          <CardDescription>Create a new FlightCoordinator account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            className="w-[300px] flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(handleSubmit)}>
            <Controller
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormRow>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    className={cn(form.formState.errors.fullName && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.fullName && <ErrorLabel>{form.formState.errors.fullName.message}</ErrorLabel>}
                </FormRow>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormRow>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="airportname"
                    type="email"
                    className={cn(form.formState.errors.email && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.email && <ErrorLabel>{form.formState.errors.email.message}</ErrorLabel>}
                </FormRow>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormRow>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className={cn(form.formState.errors.password && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.password && <ErrorLabel>{form.formState.errors.password.message}</ErrorLabel>}
                </FormRow>
              )}
            />
            <Button className="w-full" type="submit">
              {isRegisterPending ? (
                <>
                  <Loader2 className="animate-spin" /> Processing
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link
            href={"/auth/login"}
            className="text-sm text-muted-foreground w-full text-center hover:text-primary transition-colors">
            Already have an account? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export { RegisterForm };
