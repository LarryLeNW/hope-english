"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/style.css";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { DayPickerSingleProps } from "react-day-picker";

function SingleCalendar({ className, classNames, showOutsideDays = true, selected, ...props }: DayPickerSingleProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(selected instanceof Date ? selected : undefined);

  return (
    <DayPicker
      selected={selected}
      showOutsideDays={showOutsideDays}
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      className={cn("p-3", className)}
      components={{
        IconLeft: ({ className, ...props }) => <ChevronLeft className={cn("h-4 w-4", className)} {...props} />,
        IconRight: ({ className, ...props }) => <ChevronRight className={cn("h-4 w-4", className)} {...props} />,
      }}
      {...props}
    />
  );
}
SingleCalendar.displayName = "Calendar";

export { SingleCalendar };
