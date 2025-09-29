"use client";

import { useEffect, useState } from "react";
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
import ImageUpload from "@/components/ImageUpload";
import { Camera } from "lucide-react";
import { Loader2 } from "lucide-react";

interface IProps {
  children: React.ReactNode;
  startDate?: Date;
  startTime?: { hour: number; minute: number };
}

export function AddEventDialog({ children, startDate, startTime }: IProps) {
  const { users } = useCalendar();
  const { createEvent } = useEventStore();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [isUploadAvatar, setIsUploadAvatar] = useState<boolean>(false);
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
      time: "",
      sendMember: true,
    },
  });
  const uploadedImages = form.watch("images") || [];

  const onSubmit = (data: TEventFormData) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    createEvent(data);
    onClose();
    form.reset();
  };


  useEffect(() => {
    form.reset({
      title: "",
      desc: "",
      startsAt: startDate ? startDate.toISOString() : undefined,
      endsAt: startDate ? startDate.toISOString() : undefined,
      dayOfWeek: [],
      images: [],
      color: "blue",
      time: "",
      sendMember: true,
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

  return (
    <Dialog open={isOpen} onOpenChange={onToggle} >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="md:max-w-2xl md:max-h-11/12 overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <Form {...form}>

          <form id="event-form" onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4 py-4">
            <div className="col-span-2 font-medium text-sm text-gray-700 flex items-center gap-4" >
              <FormField
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input id="title" placeholder="Enter a title" data-invalid={fieldState.invalid} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ImageUpload
                updateStatus={(status) => setIsUploadAvatar(status)}
                onUploadSuccess={(urls: string[]) => {
                  form.setValue("images", urls, { shouldValidate: true });
                }}
                isUploading={isUploadAvatar}
              >
                <Button
                  size="sm"
                  type="button"
                  className="mt-6 p-0 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center gap-1"
                  disabled={isUploadAvatar}
                >
                  {isUploadAvatar ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <p>Upload</p>
                      <Camera className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </ImageUpload>

            </div>



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
            <div >
              <FormField
                name="dayOfWeek"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Days of the Week</FormLabel>
                    <FormControl>
                      <Select
                        className="md:max-h-9"
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
            </div>

            <FormField
              control={form.control}
              name="color"
              render={({ field, fieldState }) => (
                <FormItem
                >
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
              name="sendMember"
              render={({ field, fieldState }) => (
                <FormItem
                >
                  <FormLabel>Send To Members</FormLabel>
                  <FormControl>
                    <Select
                      inputId="sendMember"
                      defaultValue={{ value: true, label: "Yes" }}
                      options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
                      value={[{ value: true, label: "Yes" }, { value: false, label: "No" }].find(o => o.value === field.value)}
                      onChange={(opt: any) => field.onChange(opt?.value)}
                      placeholder="Send email to members?"
                      classNamePrefix="react-select"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field, fieldState }) => (
                <FormItem
                  className="col-span-2"
                >
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value} data-invalid={fieldState.invalid} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {uploadedImages.length > 0 && (
              <div className="col-span-2 flex flex-wrap gap-2 mb-4">
                {uploadedImages.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`uploaded-${idx}`}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
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
