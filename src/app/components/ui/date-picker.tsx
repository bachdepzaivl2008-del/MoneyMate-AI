"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "./utils"
import { buttonVariants } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export function DatePicker({
  value,
  onChange,
  className
}: {
  value?: string;
  onChange: (date: string) => void;
  className?: string;
}) {
  const date = value ? new Date(value) : undefined;

  const formatDisplayDate = (d?: Date) => {
    if (!d) return "";
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(buttonVariants({ variant: "outline" }),
            "w-full justify-start text-left font-normal border-border bg-background focus:border-blue-600 focus:outline-none",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDisplayDate(date) : <span>Chọn ngày</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) {
              const year = d.getFullYear();
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const day = String(d.getDate()).padStart(2, '0');
              onChange(`${year}-${month}-${day}`);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
