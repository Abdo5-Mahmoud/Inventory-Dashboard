"use client";

import DropDownModel from "@/components/DropDownModal";
import { Span } from "@/components/ui/Span";
import { LogoutAction } from "@/features/auth/actions/auth.service";
import { UserProfile } from "@/features/auth/types/auth.types";
import { LogOut, Settings, User, User2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function UserDropDown({ user }: { user: UserProfile }) {
  const router = useRouter();

  async function logout() {
    await LogoutAction();
    router.push("/login");
  }
  return (
    <DropDownModel>
      <DropDownModel.Trigger>
        <User className="w-5 h-5" />
      </DropDownModel.Trigger>
      <DropDownModel.Content>
        <div className="flex gap-2 items-center p-4">
          <Image
            src={user.image || ""}
            alt={user.username || ""}
            width={20}
            height={20}
          />
          <div>
            <p className="font-bold leading-6">{user.username}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-4 py-2 border-t-2 border-border">
          <DropDownModel.LinkButton href={"/profile"}>
            <User2 className="text-foreground size-4" />
            <Span>Profile</Span>
          </DropDownModel.LinkButton>

          <DropDownModel.LinkButton href={"/settings"}>
            <Settings className="text-foreground size-4" />
            <Span>Account Settings</Span>
          </DropDownModel.LinkButton>

          <DropDownModel.ActionButton action={logout}>
            <LogOut className="size-5" />
            <Span className=" text-[14px]" color={"destructive"}>
              Sign Out
            </Span>
          </DropDownModel.ActionButton>
        </ul>
      </DropDownModel.Content>
    </DropDownModel>
  );
}
