import Footer from "@/components/footer";
import Header from "@/components/header";
import "./global.css"
interface RootLayoutProps {
  children: React.ReactNode;
  types: string;
}

export default function RootLayout({ children, types }: RootLayoutProps) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
};

