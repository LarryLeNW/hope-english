"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Home,
    Users,
    Settings,
    BarChart3,
    FileText,
    Shield,
    Database,
    Menu,
    X,
    ChevronDown,
    Search,
    Calendar,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminSidebarProps {
    className?: string
}

const menuItems = [
    {
        title: "Tổng quan",
        icon: Home,
        href: "/admin",
        badge: null,
    },
    {
        title: "Người dùng",
        icon: Users,
        href: "/admin/users",
        badge: "1.2k",
    },
    {
        title: "Sự kiện",
        icon: Calendar,
        href: "/admin/events",
        badge: "1.2k",
    },
    {
        title: "Báo cáo",
        icon: BarChart3,
        href: "/admin/analytics",
        badge: null,
        submenu: [
            { title: "Thống kê truy cập", href: "/admin/analytics/traffic" },
            { title: "Doanh thu", href: "/admin/analytics/revenue" },
            { title: "Chuyển đổi", href: "/admin/analytics/conversion" },
        ],
    },
    {
        title: "Nội dung",
        icon: FileText,
        href: "/admin/content",
        badge: null,
        submenu: [
            { title: "Bài viết", href: "/admin/content/posts" },
            { title: "Trang", href: "/admin/content/pages" },
            { title: "Media", href: "/admin/content/media" },
        ],
    },
    {
        title: "Cơ sở dữ liệu",
        icon: Database,
        href: "/admin/database",
        badge: null,
    },
    {
        title: "Bảo mật",
        icon: Shield,
        href: "/admin/security",
        badge: "3",
        badgeVariant: "destructive" as const,
    },
    {
        title: "Cài đặt",
        icon: Settings,
        href: "/admin/settings",
        badge: null,
    },
]

export default function AdminSidebar({ className }: AdminSidebarProps) {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const toggleExpanded = (title: string) => {
        setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
    }

    return (
        <div
            className={cn(
                "flex h-screen bg-admin-nav border-r border-admin-nav-border transition-all duration-300 custom-scroll",
                isCollapsed ? "w-16" : "w-64",
                className,
            )}
        >
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between p-4 border-b border-admin-nav-border">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-admin-nav-active rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <span className="font-semibold text-admin-nav-foreground">Admin Panel</span>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-admin-nav-foreground hover:bg-admin-nav-hover"
                    >
                        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                </div>

                {!isCollapsed && (
                    <div className="p-4 border-b border-admin-nav-border">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-nav-foreground/60" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full pl-10 pr-4 py-2 bg-admin-nav-hover border border-admin-nav-border rounded-lg text-sm text-admin-nav-foreground placeholder:text-admin-nav-foreground/60 focus:outline-none focus:ring-2 focus:ring-admin-nav-active"
                            />
                        </div>
                    </div>
                )}

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <div key={item.title}>
                            <div
                                className={cn(
                                    "flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors",
                                    "text-admin-nav-foreground hover:bg-admin-nav-hover hover:text-blue-500",
                                    "group cursor-pointer",
                                )}
                                onClick={() => item.submenu ? toggleExpanded(item.title) : router.push(item.href)}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    {!isCollapsed && (
                                        <>
                                            <span className="font-medium">{item.title}</span>
                                            {item.badge && (
                                                <Badge variant={item.badgeVariant || "secondary"} className="ml-auto text-xs">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </div>
                                {!isCollapsed && item.submenu && (
                                    <ChevronDown
                                        className={cn("h-4 w-4 transition-transform", expandedItems.includes(item.title) && "rotate-180")}
                                    />
                                )}
                            </div>

                            {!isCollapsed && item.submenu && expandedItems.includes(item.title) && (
                                <div className="ml-8 mt-2 space-y-1">
                                    {item.submenu.map((subItem) => (
                                        <div
                                            key={subItem.title}
                                            className="flex items-center p-2 rounded-md text-sm text-admin-nav-foreground/80 hover:bg-admin-nav-hover hover:text-blue-400 cursor-pointer transition-colors"
                                        >
                                            {subItem.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-admin-nav-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-admin-nav-active rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">AD</span>
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1">
                                <p className="text-sm font-medium text-admin-nav-foreground">Admin User</p>
                                <p className="text-xs text-admin-nav-foreground/60">admin@example.com</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
