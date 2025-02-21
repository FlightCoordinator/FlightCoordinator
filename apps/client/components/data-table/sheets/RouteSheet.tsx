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

import { useToast } from "@/hooks/interface/use-toast";
import useRouteCreateMutation from "@/hooks/resource/route/useRouteCreateMutation";
import useRouteUpdateMutation from "@/hooks/resource/route/useRouteUpdateMutation";

import { cn } from "@/shared/lib/twUtils";

import DataTransfer from "@/types/dto";

import {
  greaterThanZeroMessage,
  requiredMessage,
  shouldBeNumberMessage,
  shouldBeStringMessage,
} from "../constants/validationMessages";
import SaveButton from "../partials/SaveButton";
import ErrorLabel from "./base/ErrorLabel";
import SheetRow from "./base/SheetRow";

interface RouteSheetProps {
  route?: DataTransfer.RouteDTO;
}

const routeSchema = z.object({
  originAirportId: z.string(shouldBeStringMessage).nonempty(requiredMessage),
  destinationAirportId: z.string(shouldBeStringMessage).nonempty(requiredMessage),
  distance: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
  estimatedTime: z.number(shouldBeNumberMessage).positive(greaterThanZeroMessage),
});

const RouteSheet = ({ route }: RouteSheetProps) => {
  const form = useForm<z.infer<typeof routeSchema>>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      originAirportId: route ? route.originAirportId : "",
      destinationAirportId: route ? route.destinationAirportId : "",
      distance: route ? route.distance : 1,
      estimatedTime: route ? route.estimatedTime : 1,
    },
  });

  const { toast } = useToast();

  const {
    mutateAsync: routeCreateMutation,
    isPending: isRouteCreateLoading,
    error: routeCreateError,
  } = useRouteCreateMutation();
  const {
    mutateAsync: routeUpdateMutation,
    isPending: isRouteUpdateLoading,
    error: routeUpdateError,
  } = useRouteUpdateMutation();

  const handleCreateSubmit = async (formData: z.infer<typeof routeSchema>): Promise<void> => {
    routeCreateMutation(formData)
      .then((response) => {
        if (!response.isSuccess || routeCreateError) {
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

  const handleUpdateSubmit = async (formData: z.infer<typeof routeSchema>): Promise<void> => {
    routeUpdateMutation({ id: route!.id, ...formData })
      .then((response) => {
        if (!response.isSuccess || routeUpdateError) {
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
        <Button variant={route ? "ghost" : "outline"} size={route ? "icon" : "default"}>
          {route ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Route
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{route ? "Edit Route" : "Create a new Route"}</SheetTitle>
          <SheetDescription>Click save button at the bottom after editing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form
            noValidate
            className="-full flex flex-col items-start justify-start gap-5"
            onSubmit={form.handleSubmit(route ? handleUpdateSubmit : handleCreateSubmit)}>
            <Controller
              control={form.control}
              name="originAirportId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="originAirportId">Origin Airport Id</Label>
                  <Input
                    id="originAirportId"
                    className={cn(form.formState.errors.originAirportId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.originAirportId && (
                    <ErrorLabel>{form.formState.errors.originAirportId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="destinationAirportId"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="destinationAirportId">Destination Airport Id</Label>
                  <Input
                    id="destinationAirportId"
                    className={cn(form.formState.errors.destinationAirportId && "border-destructive")}
                    {...field}
                  />
                  {form.formState.errors.destinationAirportId && (
                    <ErrorLabel>{form.formState.errors.destinationAirportId.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="distance"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="distance">Distance</Label>
                  <Input
                    id="distance"
                    className={cn(form.formState.errors.distance && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.distance && <ErrorLabel>{form.formState.errors.distance.message}</ErrorLabel>}
                </SheetRow>
              )}
            />
            <Controller
              control={form.control}
              name="estimatedTime"
              render={({ field }) => (
                <SheetRow>
                  <Label htmlFor="estimatedTime">Estimated Time</Label>
                  <Input
                    id="estimatedTime"
                    className={cn(form.formState.errors.estimatedTime && "border-destructive")}
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                  {form.formState.errors.estimatedTime && (
                    <ErrorLabel>{form.formState.errors.estimatedTime.message}</ErrorLabel>
                  )}
                </SheetRow>
              )}
            />
            <SaveButton isLoading={isRouteCreateLoading || isRouteUpdateLoading} />
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default RouteSheet;
