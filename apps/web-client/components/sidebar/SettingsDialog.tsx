"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Settings } from "lucide-react";
import { useTheme } from "next-themes";

import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import useLogoutMutation from "@/hooks/auth/useLogoutMutation";
import { toast } from "@/hooks/interface/useToast";

import GlobalTypes from "@/types/globals";

import { Button } from "../base-ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../base-ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../base-ui/dropdown-menu";
import { Label } from "../base-ui/label";
import { Separator } from "../base-ui/separator";
import { Skeleton } from "../base-ui/skeleton";

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const SettingsDialog = () => {
  const router = useRouter();

  const { mutateAsync: logoutMutationAsync, isPending: isLogoutLoading, error: logoutError } = useLogoutMutation();

  const handleLogout = () => {
    logoutMutationAsync()
      .then((response) => {
        if (!response || !response.isSuccess || logoutError) {
          toast({ title: "An error ocurred", description: response.message });
          return;
        }
        return router.replace("/auth/login");
      })
      .catch((error) => toast({ title: "An error ocurred", description: error.message }));
  };

  const [userDetails, setUserDetails] = React.useState<GlobalTypes.Auth.Protected.UserDetailsProps>({
    fullName: "",
    email: "",
    isActive: true,
    isLocked: false,
  });

  const queryClient = useQueryClient();

  const {
    mutateAsync: getUserDetailsAsync,
    isPending: isUserDetailsLoading,
    error: userDetailsError,
  } = useGetUserDetails();

  React.useEffect(() => {
    const userDetailsQueryData = queryClient.getQueryData(["userDetailsMutation"]);
    if (!userDetailsQueryData) {
      getUserDetailsAsync()
        .then((response) => {
          if (!response.isSuccess || !response.data || userDetailsError) {
            return toast({
              title: "An error ocurred",
              description: "Please try logging in again.",
            });
          }
          setUserDetails(() => response.data!);
        })
        .catch(() =>
          toast({
            title: "An error ocurred",
            description: "Please try logging in again.",
          }),
        );
    } else if (userDetailsQueryData && (userDetails.fullName.trim() === "" || userDetails.fullName.trim() === "")) {
      setUserDetails(() => userDetailsQueryData as GlobalTypes.Auth.Protected.UserDetailsProps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { setTheme, theme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto p-1.5 px-2 justify-between">
          <div className="flex flex-col items-start justify-center gap-0.5">
            {isUserDetailsLoading ? (
              <>
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[175px]" />
              </>
            ) : (
              <>
                <span className="text-[15px] font-semibold">{userDetails.fullName}</span>
                <span className="text-xs text-muted-foreground">{userDetails.email}</span>
              </>
            )}
          </div>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>You can update your preferences here</DialogDescription>
          <div className="flex flex-col items-start justify-start gap-2 py-2">
            <Separator decorative className="rounded-lg" />
            <div className="h-10 w-full flex flex-row items-center justify-between">
              <Label htmlFor="theme">App theme</Label>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-[120px]" asChild>
                  <Button id="theme" variant="outline">
                    {theme ? capitalize(theme) : "Theme"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[120px]">
                  <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem checked={theme === "light"} onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={theme === "dark"} onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={theme === "system"} onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="h-10 w-full flex flex-row items-center justify-between">
              <Label>Log out from your account</Label>
              <Button variant="destructive" className="w-[120px]" onClick={() => handleLogout()}>
                {isLogoutLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
                Log Out
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
