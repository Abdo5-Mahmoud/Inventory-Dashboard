import { cookies } from "next/headers";
import { LoginResponse } from "../types/auth.types";
const COOKIE_OPTIONS = {
  httpOnly: true, // يمنع الجافا سكريبت في المتصفح من قراءة الكوكي (حماية من XSS)
  secure: process.env.NODE_ENV === "production", // لا تعمل إلا عبر HTTPS في البيئة الحية
  sameSite: "strict", // حماية من هجمات الـ CSRF (لا تُرسل مع طلبات من مواقع خارجية)
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
} as const;
export async function setAuthCookie(data: LoginResponse) {
  const { accessToken, refreshToken, ...user } = data;
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, COOKIE_OPTIONS);
  cookieStore.set("refreshToken", refreshToken, COOKIE_OPTIONS);
  cookieStore.set("user", JSON.stringify(user), COOKIE_OPTIONS);
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("user");
}
