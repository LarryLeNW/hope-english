import { RegisterForm } from "@/app/components/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Users, Star, Sparkles, Crown, Shield } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50 flex items-center justify-center px-4 ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-cyan-200 to-purple-200 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full opacity-20 animate-bounce delay-500"></div>
        <div className="absolute top-1/2 left-5 w-8 h-8 bg-yellow-200 rounded-full opacity-30 animate-ping delay-700"></div>
        <div className="absolute top-1/3 right-5 w-6 h-6 bg-rose-200 rounded-full opacity-25 animate-pulse delay-1500"></div>
      </div>

      <div className="relative w-full max-w-lg space-y-8 z-10">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Crown className="w-8 h-8 text-cyan-700" />
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-purple-700" />
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <Shield className="w-8 h-8 text-yellow-700" />
              </div>
            </div>

            <div className="relative">
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent tracking-tight animate-pulse">
                Tham gia cộng đồng đầy yêu thương và hy vọng
              </h1>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" />
              </div>
            </div>

            <div className="mt-4 max-w-md mx-auto">
              <div className="flex justify-center items-center space-x-2 mt-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
          <CardHeader className="space-y-4 pb-6">
            <div className="text-center">
              <CardTitle className="text-2xl text-cyan-800 font-black mb-2">Đăng Ký Ngay</CardTitle>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-500 mx-auto rounded-full mb-3"></div>
              <CardDescription className="text-slate-600 text-lg">
                Bước đầu tiên để kết nối với cộng đồng
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <RegisterForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Separator className="bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-4 text-slate-400">
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <Users className="w-4 h-4 text-cyan-400 animate-pulse delay-300" />
              <Star className="w-4 h-4 text-yellow-400 animate-pulse delay-700" />
            </div>

            <p className="text-slate-600">
              Đã có tài khoản?{" "}
              <a
                href="/login"
                className="text-cyan-700 hover:text-purple-600 font-semibold hover:underline transition-all duration-200 inline-flex items-center group"
              >
                Đăng nhập ngay
                <span className="ml-1 transform transition-transform group-hover:translate-x-1">✨</span>
              </a>
            </p>

            <div className="text-xs text-slate-400 space-y-2">
              <p className="font-medium">🛡️ An toàn & Bảo mật</p>
              <div className="flex justify-center items-center space-x-2">
                <Heart className="w-3 h-3 text-red-400" />
                <span>Cộng đồng Chúa Jesus</span>
                <Heart className="w-3 h-3 text-red-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
