import { create } from "zustand";
import { CreateEventDto, ResEventDto } from "@/app/@types/event";
import eventRequest from "@/app/apis/event";

type EventState = {
  events: ResEventDto[];
  loading: boolean;
  error?: string;
  createEvent: (payload: CreateEventDto) => Promise<ResEventDto | undefined>;
  fetchEvents: () => Promise<void>;
  clearError: () => void;
};

const useEventStore = create<EventState>((set, get) => ({
  events: [],
  loading: false,
  error: undefined,

  fetchEvents: async () => {
    try {
      set({ loading: true, error: undefined });
      // const res = await eventRequest.list(); 
      // set({ events: res.data ?? [], loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to fetch events", loading: false });
    }
  },

  createEvent: async (payload: CreateEventDto) => {
    try {
      set({ loading: true, error: undefined });
      const res = await eventRequest.create(payload);
      const created: ResEventDto = res.data;
      set((s) => ({ events: [created, ...s.events], loading: false }));
      return created;
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to create event", loading: false });
    }
  },

  clearError: () => set({ error: undefined }),
}));

export default useEventStore;
