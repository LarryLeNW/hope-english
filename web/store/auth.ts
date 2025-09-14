'use client'
import { create } from 'zustand'

type State = { token?: string }
type Actions = { setToken: (t?: string)=>void; logout: ()=>void }
export const useAuth = create<State & Actions>((set) => ({
  token: undefined,
  setToken: (t) => set({ token: t }),
  logout: () => set({ token: undefined })
}))
