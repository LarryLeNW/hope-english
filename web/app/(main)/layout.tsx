import Footer from "@/app/layouts/user/footer";
import Header from "@/app/layouts/user/header";
interface MainLayoutProps {
  children: React.ReactNode;
  types: string;
}

export default function MainLayout({ children, types }: MainLayoutProps) {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-50"></div>
      </div>
      <Header />
      <main className="md:pt-6">{children}</main>
      <Footer />
    </div>
  );
};

