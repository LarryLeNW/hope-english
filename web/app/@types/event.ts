import { DayOfWeekEnum } from "@/calendar/schemas";
import z from "zod";

export type CreateEventDto = {
    title: string;
    startsAt: string;
    endsAt: string;
    location?: string;
    color?: string;
    time?: number,
    desc?: string;
    images?: string[];
    dayOfWeek?: DayOfWeek[];
};

export type ResEventDto = CreateEventDto;

export type UpdateEventDto = {
    title?: string;
    startsAt?: string;
    endsAt?: string;
    location?: string;
    color?: string;
    desc?: string;
    time?: string;
    images?: string[];
    dayOfWeek?: DayOfWeek[];
};

export type DayOfWeek = z.infer<typeof DayOfWeekEnum>;