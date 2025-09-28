"use client";

import React, { useEffect, useRef, useState } from "react";
import { USER_MENUS } from "@/app/constants";
import useAuthStore from "@/store/auth";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useClickOutside from "@/app/hooks/useOnClickOutside";

export default function Header() {
    const router = useRouter();
    const asideRef = useRef<HTMLElement | null>(null);
    const toggleBtnRef = useRef<HTMLButtonElement | null>(null); // NEW
    const { user, fetchUser, logout } = useAuthStore((state: any) => ({
        user: state.user,
        fetchUser: state.fetchUser,
        logout: state.logout,
    }));

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user && user.role === "ADMIN") {
            router.push("/admin");
        }
    }, [user]);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useClickOutside([asideRef], () => setOpen(false), {
        enabled: open,
        ignoreRefs: [toggleBtnRef],
        events: ["pointerdown"],
    });

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
            <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="flex items-center justify-between">
                    {/* left: logo */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50"></div>
                            <BookOpen className="relative h-10 w-10 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                Hope English
                            </h1>
                            <p className="text-xs text-purple-300 hidden md:flex items-center">
                                <span>TEACHING ENGLISH</span>
                                <span className="mx-2">|</span>
                                <span>CHANGING LIVES</span>
                            </p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {USER_MENUS?.map((item: any) => (
                            <Link
                                key={item.title ?? item.href}
                                href={item.href ?? "#"}
                                className="relative text-white hover:text-white transition-all duration-300 group md:text-lg"
                            >
                                {item.title ?? item.label ?? item.href}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4 text-white hover:text-white">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="md:text-lg">{user.name}</span>
                                    <button onClick={logout} className="text-red-400">
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="relative transition-all duration-300 group md:text-2xl bg-blue-500 rounded-3xl px-6 py-1"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        <button
                            ref={toggleBtnRef} // NEW
                            aria-label={open ? "Đóng menu" : "Mở menu"}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="md:hidden p-2 rounded-md bg-white/5 text-white/90 hover:bg-white/10 transition relative z-[80]" // NEW: nổi hơn overlay
                        >
                            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`fixed inset-0 z-[60] transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"} md:hidden`}
                aria-hidden={!open}
            >
                <div
                    onClick={() => setOpen(false)}
                    className={`absolute left-0 right-0 bottom-0 top-18 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"} bg-black/40`}
                />

                <aside
                    ref={asideRef}
                    className={`fixed left-0 top-18 h-full w-72 max-w-[85vw] text-white transform transition-transform duration-300 z-[70] ${open ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="p-5 flex flex-col min-h-full h-screen rounded-r-xl bg-black/40 backdrop-blur-lg border border-white/20">
                        <nav className="flex-1 overflow-auto">
                            <ul className="flex flex-col gap-1">
                                {USER_MENUS?.map((item: any) => (
                                    <li key={item.title ?? item.href}>
                                        <Link
                                            href={item.href ?? "#"}
                                            onClick={() => setOpen(false)}
                                            className="block px-4 py-3 rounded-md text-left text-lg text-white hover:bg-white/5"
                                        >
                                            {item.title ?? item.label ?? item.href}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="mt-6">
                            {user ? (
                                <div className="flex flex-col gap-3">
                                    <div className="font-medium">Xin chào, {user.name}</div>
                                    <div className="flex gap-2">
                                        <button onClick={logout} className="w-full rounded-md px-3 py-2 bg-red-500 text-white">
                                            Đăng xuất
                                        </button>
                                        <Link href="/profile" onClick={() => setOpen(false)} className="w-full rounded-md px-3 py-2 bg-white/5 text-white">
                                            Hồ sơ
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="block w-full text-center rounded-md px-3 py-2 bg-blue-500 text-white"
                                >
                                    Đăng nhập
                                </Link>
                            )}
                        </div>
                        <div className="mt-4 text-xs text-center text-white/60">© {new Date().getFullYear()} Hope English</div>
                    </div>
                </aside>
            </div>
        </header>
    );
}
