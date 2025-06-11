import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base-ui/select";

import { cn } from "@/shared/lib/twUtils";

import type { GlobalTypes } from "@/types/globals";

interface FormSelectProps {
  placeholder: string;
  hasError: boolean;
  items: GlobalTypes.SelectItemProps[];
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onchange: (...event: any[]) => void;
  value: string;
}

const FormSelect = ({ placeholder, hasError, items, onchange, value }: FormSelectProps) => {
  return (
    <Select onValueChange={onchange} defaultValue={value}>
      <SelectTrigger className={cn(hasError && "border-destructive")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { FormSelect };
