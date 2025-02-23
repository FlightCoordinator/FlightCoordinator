"use client";

import React from "react";

import { LogOut, Settings } from "lucide-react";
import { useTheme } from "next-themes";

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

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const UserDetails = () => {
  const { setTheme, theme } = useTheme();

  const FULLNAME: string = "";
  const EMAIL: string = "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto p-1.5 px-2 justify-between">
          <div className="flex flex-col items-start justify-center gap-0.5">
            <span className="text-[15px] font-semibold">{FULLNAME}</span>
            <span className="text-xs text-muted-foreground">{EMAIL}</span>
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
              <Button variant="destructive" className="w-[120px]">
                <LogOut />
                Log Out
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;
