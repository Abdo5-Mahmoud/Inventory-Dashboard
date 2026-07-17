// "use client";

import { SearchComponent } from "@/components/ui/SearchComponent";
import { getSessionUser } from "@/features/auth/services/session.service";
import { UserProfile } from "@/features/auth/types/auth.types";
import { BellRing } from "lucide-react";
import { UserDropDown } from "./UserDropDown";
export async function Navbar() {
  const user: UserProfile = await getSessionUser();
  return (
    <nav className="border-b border-border text-secondary-foreground flex items-center h-16 md:py-2.5 justify-between gap-2 px-4 min-h-16 ">
      <p className="text-sm font-semibold tracking-tighter text-muted-foreground">
        {user.firstName} {user.lastName}
      </p>
      <div className="flex gap-2 items-center">
        <BellRing className="w-5 h-5" />
        <UserDropDown user={user} />
      </div>
    </nav>
  );
}
