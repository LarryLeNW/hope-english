import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, BookOpen } from "lucide-react"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">Cộng đồng Chúa Jesus</h1>
                    <p className="text-xl text-muted-foreground text-balance">
                        "Hãy yêu thương lẫn nhau như Ta đã yêu thương các ngươi" - Giăng 13:34
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/register">Tham gia cộng đồng</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/login">Đăng nhập</Link>
                        </Button>
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    <Card>
                        <CardHeader className="text-center">
                            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle>Tình yêu thương</CardTitle>
                            <CardDescription>Chia sẻ tình yêu của Chúa với mọi người xung quanh</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader className="text-center">
                            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle>Cộng đồng</CardTitle>
                            <CardDescription>Kết nối với những người cùng đức tin và chia sẻ</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader className="text-center">
                            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle>Lời Chúa</CardTitle>
                            <CardDescription>Học hỏi và chia sẻ Lời Chúa mỗi ngày</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}
