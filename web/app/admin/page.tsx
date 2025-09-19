import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
    {
        title: "Tổng người dùng",
        value: "1,234",
        change: "+12%",
        trend: "up",
        icon: Users,
    },
    {
        title: "Doanh thu",
        value: "₫45.2M",
        change: "+8.2%",
        trend: "up",
        icon: DollarSign,
    },
    {
        title: "Lượt truy cập",
        value: "12,543",
        change: "-2.1%",
        trend: "down",
        icon: TrendingUp,
    },
    {
        title: "Hoạt động",
        value: "89.2%",
        change: "+5.4%",
        trend: "up",
        icon: Activity,
    },
]

const recentActivities = [
    {
        user: "Nguyễn Văn A",
        action: "đã tạo bài viết mới",
        time: "2 phút trước",
        status: "success",
    },
    {
        user: "Trần Thị B",
        action: "đã cập nhật hồ sơ",
        time: "5 phút trước",
        status: "info",
    },
    {
        user: "Lê Văn C",
        action: "đã xóa tài khoản",
        time: "10 phút trước",
        status: "warning",
    },
    {
        user: "Phạm Thị D",
        action: "đã đăng nhập",
        time: "15 phút trước",
        status: "success",
    },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-balance">Chào mừng trở lại!</h1>
                    <p className="text-muted-foreground mt-1">Đây là tổng quan về hệ thống của bạn hôm nay.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Tạo mới</Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center space-x-1 text-xs">
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                                )}
                                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                                <span className="text-muted-foreground">so với tháng trước</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Hoạt động gần đây</CardTitle>
                        <CardDescription>Các hoạt động mới nhất trong hệ thống</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                        <span className="text-xs font-medium">{activity.user.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm">
                                            <span className="font-medium">{activity.user}</span> {activity.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </div>
                                <Badge
                                    variant={
                                        activity.status === "success"
                                            ? "default"
                                            : activity.status === "warning"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                    className="text-xs"
                                >
                                    {activity.status}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thao tác nhanh</CardTitle>
                        <CardDescription>Các tác vụ thường dùng trong quản trị</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Users className="mr-2 h-4 w-4" />
                            Quản lý người dùng
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Xem báo cáo
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Activity className="mr-2 h-4 w-4" />
                            Kiểm tra hệ thống
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Quản lý thanh toán
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
