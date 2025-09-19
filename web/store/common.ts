"use client";
import { create } from "zustand";

type SidebarStore = {
    isExpanded: boolean;
    isMobileOpen: boolean;
    isHovered: boolean;
    activeItem: string | null;
    openSubmenu: string | null;
    isMobile: boolean;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    setIsHovered: (isHovered: boolean) => void;
    setActiveItem: (item: string | null) => void;
    toggleSubmenu: (item: string) => void;
    setIsMobile: (mobile: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set, get) => ({
    isExpanded: true,
    isMobileOpen: false,
    isHovered: false,
    activeItem: null,
    openSubmenu: null,
    isMobile: false,
    toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
    toggleMobileSidebar: () =>
        set((state) => ({ isMobileOpen: !state.isMobileOpen })),
    setIsHovered: (isHovered: boolean) => set({ isHovered }),
    setActiveItem: (item: string | null) => set({ activeItem: item }),
    toggleSubmenu: (item: string) =>
        set((state) => ({ openSubmenu: state.openSubmenu === item ? null : item })),
    setIsMobile: (mobile: boolean) => set({ isMobile: mobile }),
}));


type Theme = "light" | "dark";

interface ThemeStore {
    theme: Theme;
    isInitialized: boolean;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: "light",
    isInitialized: false,
    setTheme: (theme: Theme) => {
        set({ theme, isInitialized: true });
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            if (newTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return { theme: newTheme, isInitialized: true };
        }),
}));
