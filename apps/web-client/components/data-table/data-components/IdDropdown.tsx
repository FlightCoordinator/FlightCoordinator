"use client";

import React from "react";

import { Copy } from "lucide-react";

import { Button } from "@/components/base-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/base-ui/dropdown-menu";

import { useToast } from "@/hooks/interface/useToast";

interface IdDropdownProps {
  ids: string[];
}

const IdDropdown = ({ ids }: IdDropdownProps) => {
  const { toast } = useToast();

  if (ids.length === 0) {
    return "-";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Click to see all {ids.length}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {ids.map((id) => (
            <DropdownMenuItem
              key={id}
              className="flex flex-row items-center justify-end gap-3"
              onClick={() => {
                navigator.clipboard.writeText(id);
                toast({
                  title: "ID Copied!",
                  description: "Selected ID copied to clipboard.",
                });
              }}>
              <span className="inline-block">{id}</span>
              <Copy />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default IdDropdown;
