"use client";

import React from "react";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/base-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/base-ui/dropdown-menu";

interface IdDropdownProps {
  ids: string[];
}

const IdDropdown = ({ ids }: IdDropdownProps) => {
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
                toast("Selected ID copied to clipboard.");
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
