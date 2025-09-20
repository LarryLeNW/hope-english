"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, User, LogOut, Moon, Sun } from "lucide-react"
import { useState } from "react"
import useAuthStore from "@/store/auth"
import { useRouter } from "next/navigation"

export default function AdminHeader() {
    const router = useRouter()
    const [isDark, setIsDark] = useState(false)
    const { user, logout } = useAuthStore((state: any) => ({
        user: state.user,
        logout: state.logout,
    }));

    const toggleTheme = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle("dark")
    }

    const handleLogout = () => {
        logout();
        router.push('/login');
    }

    return (
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
                <h1 className="text-lg md:text-xl font-semibold text-foreground">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-1 md:space-x-3">
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-foreground">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                        3
                    </span>
                </Button>

                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Settings className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-2 pl-3 border-l border-border">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
