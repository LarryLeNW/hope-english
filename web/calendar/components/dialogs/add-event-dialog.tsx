"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCalendar } from "@/calendar/contexts/calendar-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SingleDayPicker } from "@/components/ui/single-day-picker";
import Select from "react-select";
import { Dialog, DialogHeader, DialogClose, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { eventSchema } from "@/calendar/schemas";
import type { TEventFormData } from "@/calendar/schemas";
import { useDisclosure } from "@/calendar/hooks/use-disclosure";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { colorOptions, dayOfWeekOptions } from "@/app/constants";
import useEventStore from "@/store/event";
import { mergeDateAndHour, mergeDateAndTime } from "@/lib";

interface IProps {
  children: React.ReactNode;
  startDate?: Date;
  startTime?: { hour: number; minute: number };
}

export function AddEventDialog({ children, startDate, startTime }: IProps) {
  const { users } = useCalendar();
  const { createEvent } = useEventStore();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const form = useForm<TEventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      desc: "",
      startsAt: startDate ? startDate.toISOString() : undefined,
      endsAt: startDate ? startDate.toISOString() : undefined,
      dayOfWeek: [],
      images: [],
      color: "blue",
      time: null
    },
  });

  const onSubmit = (data: TEventFormData) => {
    createEvent(data);
    onClose();
    form.reset();
  };


  useEffect(() => {
    form.reset({
      startsAt: startDate ? startDate.toISOString() : null,
      endsAt: startDate ? startDate.toISOString() : null,
    });
  }, [startDate, startTime, form.reset]);


  const colorSelectStyles = {
    option: (base: any, { data, isFocused }: any) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      gap: 8,
      ":before": {
        content: '" "',
        width: 10,
        height: 10,
        borderRadius: "9999px",
        backgroundColor: data.color,
        display: "inline-block",
      },
      backgroundColor: isFocused ? "rgba(0,0,0,0.05)" : base.backgroundColor,
    }),
    singleValue: (base: any, { data }: any) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      gap: 8,
      ":before": {
        content: '" "',
        width: 10,
        height: 10,
        borderRadius: "9999px",
        backgroundColor: data.color,
        display: "inline-block",
      },
    }),
  };

  const hourOptions = Array.from({ length: 25 }, (_, h) => ({
    value: h, label: String(h).padStart(2, "0") + ":00",
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id="event-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input id="title" placeholder="Enter a title" data-invalid={fieldState.invalid} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="startsAt"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <SingleDayPicker
                        id="startDate"
                        value={field.value ? new Date(field.value) : undefined}
                        onSelect={date => field.onChange(date.toISOString())}
                        placeholder="Select a date"
                        data-invalid={fieldState.invalid}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="time"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      step={300}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        field.onChange(v);
                        const merged = mergeDateAndTime(form.getValues("startsAt"), v);
                        if (merged) form.setValue("startsAt", merged, { shouldValidate: true });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="dayOfWeek"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Days of the Week</FormLabel>
                  <FormControl>
                    <Select
                      isMulti
                      options={dayOfWeekOptions}
                      value={field.value?.map((day: string) => ({ value: day, label: day }))}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions?.map((option: any) => option.value) || [];
                        field.onChange(selectedValues);
                      }}
                      placeholder="Select days"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="endsAt"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <SingleDayPicker
                        value={field.value ? new Date(field.value) : undefined}
                        onSelect={date => field.onChange(date.toISOString())}
                        placeholder="Select a date"
                        data-invalid={fieldState.invalid}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="desc"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value} data-invalid={fieldState.invalid} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select
                      inputId="color"
                      options={colorOptions}
                      styles={colorSelectStyles}
                      value={colorOptions.find(o => o.value === field.value)}
                      onChange={(opt: any) => field.onChange(opt?.value)}
                      isClearable
                      placeholder="Pick a color"
                      classNamePrefix="react-select"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Images (URLs)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter image URLs separated by commas"
                      {...field}
                      value={field.value ? field.value.join(", ") : ""}
                      onChange={e => field.onChange(e.target.value.split(", ").map((url) => url.trim()))}
                      data-invalid={fieldState.invalid}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="event-form" type="submit">
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
