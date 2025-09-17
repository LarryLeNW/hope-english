import Footer from "@/components/footer";
import Header from "@/components/header";
interface MainLayoutProps {
  children: React.ReactNode;
  types: string;
}

export default function MainLayout({ children, types }: MainLayoutProps) {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-20">
      <Header />
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

