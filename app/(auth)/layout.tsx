import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "h-screen",
        "w-screen",
        "flex",
        "items-center",
        "justify-center",
        "antialiased",
        "bg-background",
        "overflow-hidden",
        "py-25",
      )}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}
