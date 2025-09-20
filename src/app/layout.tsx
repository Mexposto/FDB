// src/app/layout.tsx
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Festival del Bosque",
  description: "Sitio oficial del Festival del Bosque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
