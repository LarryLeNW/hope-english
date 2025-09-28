import { PagedResult } from "@/app/@types";
import { CreateEventDto, ResEventDto } from "@/app/@types/event";
import { api } from "@/lib/api";
import queryString from 'query-string'
const prefix = '/events';

const eventRequest = {
    create: (body?: CreateEventDto) =>
        api.post<ResEventDto>(`${prefix}`,
            body
        ),
}

export default eventRequest;