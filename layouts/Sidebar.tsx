"use client";
import {
  Archive,
  Form,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogoutAction } from "@/features/auth/actions/auth.service";

const linksList = [
  {
    href: "/",
    title: "Dashboard",
    icon: <LayoutDashboard className="size-4.5" />,
  },
  {
    href: "/inventory",
    title: "Inventory",
    icon: <Archive className="size-4.5" />,
  },
  {
    href: "/orders",
    title: "Orders",
    icon: <ShoppingCart className="size-4.5" />,
  },
  // {
  //   href: "/invoices",
  //   title: "Invoices",
  //   icon: <Form className="size-4.5" />,
  // },
  {
    href: "/settings",
    title: "Settings",
    icon: <Settings className="size-4.5" />,
  },
];
export function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname == path || pathname.startsWith(path + "/");
  };
  return (
    <aside className="flex flex-row md:flex-col justify-center items-center  md:items-center md:justify-between max-sm:h-20 md:h-screen bg-secondary dark:bg-sidebar px-8 md:p-4  md:w-[256px] md:border-r-2 border-t-2 border-border md:border-t-0 ">
      <div className="hidden pb-6 md:block width-full">
        <div className="px-2">
          <h2 className="text-2xl font-bold tracking-normal leading-8 text-accent">
            DashCommerce
          </h2>
          <p className="text-sm tracking-[0.14px] leading-5 text-foreground">
            Enterprise Admin
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-1 gap-6 justify-center items-center w-full md:justify-start md:gap-1 md:flex-col">
        {linksList.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.href}
              className={`relative flex flex-col gap-1 items-center text-sm rounded-md md:flex-row leading-3.5 tracking-[-0.5px] md:leading-6 md:tracking-normal md:justify-start md:gap-4 md:py-2 md:px-4 md:rounded-sm hover:bg-primary md:w-full md:hover:text-primary-foreground z-10 text-[10px]  md:text-[16px] overflow-visible ${isActive(link.href) ? "text-primary-foreground font-bold" : ""}`}
            >
              {link.icon}
              {link.title}
              <div
                className={`absolute -inset-2 md:inset-0 -bottom-2 bg-primary -z-10 rounded-lg ${isActive(link.href) ? "block" : "hidden"}`}
              ></div>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-1 justify-start pt-4 w-full max-sm:hidden">
        <Button className="flex gap-1" onClick={LogoutAction}>
          <LogOut />
          Logout
        </Button>
      </div>
    </aside>
  );
}
