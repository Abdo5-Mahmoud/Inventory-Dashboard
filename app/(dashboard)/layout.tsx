import Providers from "@/app/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/layouts/navbar/Navbar";
import { Sidebar } from "@/layouts/Sidebar";
import { cn } from "@/lib/utils";
import { Bounce, ToastContainer } from "react-toastify";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse md:flex-row",
        "min-h-0",
        "flex-1",
        "overflow-hidden",
      )}
    >
      <Sidebar />
      <div className={cn("flex-1", "flex", "flex-col", "min-h-0", "relative")}>
        <Navbar />
        <main className={cn("flex", "overflow-y-auto", "")}>
          <Providers>{children}</Providers>
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
        </main>
      </div>
    </div>
  );
}
