import { z } from "zod";

export const DayOfWeekEnum = z.enum(["MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
  "ALL"]);


export const TimeHHmm = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be HH:mm")
  .optional();

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().optional(),
  startsAt: z.string().refine(v => !isNaN(Date.parse(v)), { message: "Invalid ISO date" }),
  endsAt: z.string().refine(v => !isNaN(Date.parse(v)), { message: "Invalid ISO date" }),
  location: z.string().optional(),
  color: z.string().optional(),
  time: TimeHHmm,
  images: z.array(z.string().url()).optional(),
  dayOfWeek: z.array(DayOfWeekEnum).optional(),
});

export type TEventFormData = z.infer<typeof eventSchema>;