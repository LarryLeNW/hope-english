import Link from "next/link"
import "./global.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi"><body>
      <header className="p-4 border-b flex gap-4 justify-between">
        <div className="flex gap-4">
          <Link href="/">⛪ TJ</Link>
          <Link href="/events">Lịch lễ</Link>
          <Link href="/prayers">Cầu nguyện</Link>
          <Link href="/devotions">Suy niệm</Link>
        </div>
        <div>
          <Link href="/login">Đăng nhập</Link>
        </div>
      </header>
      <main className="p-4 max-w-5xl mx-auto">{children}</main>
    </body></html>
  )
}
