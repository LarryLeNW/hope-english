"use client"
import { USER_MENUS } from "@/app/constants";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/auth";
import { BookOpen } from "lucide-react";
import Link from "next/link";


function Header() {
    const { user, logout } = useAuthStore((state: any) => ({
        user: state.user,
        logout: state.logout,
    })); // const { user, fetchUser, logout } = useAuthStore((state: any) => ({
    //   user: state.user,
    //   fetchUser: state.fetchUser,
    //   logout: state.logout,
    // }));

    // useEffect(() => {
    //   fetchUser();
    // }, []);

    return <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50"></div>
                        <BookOpen className="relative h-10 w-10 text-white" />
                    </div>
                    <div className="flex items-center flex-col">
                        <h1 className="md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Hope English
                        </h1>
                        <p className="text-xs text-purple-300 flex flex-col md:flex-row items-center">
                            <span>TEACHING ENGLISH</span>
                            <span className="hidden md:inline mx-2">|</span>
                            <span>CHANGING LIVES</span>
                        </p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    {USER_MENUS.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="relative text-white/80 hover:text-white transition-all duration-300 group md:text-2xl"
                        >
                            {item.title}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4 text-white/80 hover:text-white">
                    <div>
                        {user ? (
                            <div className="flex gap-4 items-center">
                                <span>Hello, {user.name}</span>
                                <button onClick={logout} className="text-red-500">
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <Link href="/login"
                                className="relative transition-all duration-300 group md:text-2xl bg-blue-500 rounded-3xl px-8 py-1 "
                            >Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </header>

}

export default Header;