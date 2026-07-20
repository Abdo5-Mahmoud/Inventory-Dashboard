import { LoginForm } from "@/features/auth/components/LoginForm";
import { LayoutDashboard } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access your inventory dashboard.",
};
export default function Login() {
  return (
    <div className="flex flex-col gap-6 p-4 w-full rounded-xl max-w-110 bg-input-background">
      <div className="flex flex-col gap-2 items-center px-6 py-8 rounded-xl bg-">
        <LayoutDashboard className="size-10 text-muted-foreground background-inpu" />
        <h2 className="text-xl font-bold">DashCommerce Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back! Please enter your details to sign in
        </p>
      </div>
      <LoginForm />

      <ul className="flex gap-10 justify-center text-[12px] list-disc py-8">
        <li>Privacy Policy</li>
        <li>Terms of Service</li>
        <li> Contact Support</li>
      </ul>
    </div>
  );
}
