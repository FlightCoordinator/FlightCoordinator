"use client";

import React from "react";

import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/base-ui/button";
import { Calendar } from "@/components/base-ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/base-ui/popover";

import { dateFormat } from "@/shared/constants/dateFormat";

interface DatePickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  onchange: (...event: any[]) => void;
  value: Date;
}

const DatePicker = ({ onchange, value }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between font-normal text-left">
          {dayjs(value).format(dateFormat)}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          selected={dayjs(value).toDate()}
          onSelect={onchange}
          disabled={(date) => date < new Date("1900-01-01")}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
