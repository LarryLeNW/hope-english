"use client"
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, Sparkles, Shield } from "lucide-react"

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
            setError("Vui lòng điền đầy đủ thông tin")
            setIsLoading(false)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp!")
            setIsLoading(false)
            return
        }

        if (formData.password.length < 8) {
            setError("Mật khẩu phải có ít nhất 8 ký tự")
            setIsLoading(false)
            return
        }

        if (!formData.agreeToTerms) {
            setError("Vui lòng đồng ý với điều khoản sử dụng!")
            setIsLoading(false)
            return
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Register attempt:", formData)
        setIsLoading(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        if (error) setError("")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-slate-700 font-semibold flex items-center">
                        <User className="w-4 h-4 mr-2 text-cyan-600" />
                        Họ và tên
                    </Label>
                    <div className="relative group">
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Nguyễn Văn A"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="pl-4 pr-4 h-12 border-2 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 bg-white/50"
                            required
                        />
                        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-semibold flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-cyan-600" />
                        Email
                    </Label>
                    <div className="relative group">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-4 pr-4 h-12 border-2 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 bg-white/50"
                            required
                        />
                        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-700 font-semibold flex items-center">
                        <Lock className="w-4 h-4 mr-2 text-cyan-600" />
                        Mật khẩu
                    </Label>
                    <div className="relative group">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Tối thiểu 8 ký tự"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-4 pr-12 h-12 border-2 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 bg-white/50"
                            minLength={8}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-cyan-100 text-slate-500 hover:text-cyan-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-slate-700 font-semibold flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-cyan-600" />
                        Xác nhận mật khẩu
                    </Label>
                    <div className="relative group">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="pl-4 pr-12 h-12 border-2 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 bg-white/50"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-cyan-100 text-slate-500 hover:text-cyan-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                    className="mt-1 border-2 border-slate-300 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                />
                <Label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                    Tôi đồng ý với{" "}
                    <a
                        href="/terms"
                        className="text-cyan-700 hover:text-purple-600 font-semibold hover:underline transition-colors"
                    >
                        điều khoản sử dụng
                    </a>{" "}
                    và{" "}
                    <a
                        href="/privacy"
                        className="text-cyan-700 hover:text-purple-600 font-semibold hover:underline transition-colors"
                    >
                        chính sách bảo mật
                    </a>
                </Label>
            </div>

            <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang tạo tài khoản...</span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span>Đăng ký</span>
                    </div>
                )}
            </Button>
        </form>
    )
}
