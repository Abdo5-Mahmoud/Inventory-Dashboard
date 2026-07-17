"use server";

import { redirect } from "next/navigation";
import { removeAuthCookie, setAuthCookie } from "../lib/cookies";
import { login } from "../services/auth.service";
import { LoginRequest } from "../types/auth.types";

export async function LoginAction(
  data: LoginRequest,
): Promise<{ message?: string; status: number }> {
  const response = await login(data);
  // console.log(response);

  if (response?.accessToken) {
    await setAuthCookie(response);
    return { message: "Login successfully!", status: 200 };
  }
  return { message: response?.message, status: 400 };
}

export async function LogoutAction() {
  await removeAuthCookie();
  redirect("/login");
}
