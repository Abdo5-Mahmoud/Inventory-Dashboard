import { env } from "@/lib/env";
import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  UserProfile,
} from "../types/auth.types";
import { cookies } from "next/headers";
import { removeAuthCookie, setAuthCookie } from "../lib/cookies";

export async function login(formData: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData }),
  })
    .then((res) => res.json())
    .catch((res) => {
      console.log(res);
      throw res;
    });

  return res;
}

export async function getUserAuthProfile(token: string): Promise<UserProfile> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export async function refreshAccessToken(
  token: string,
): Promise<RefreshResponse | undefined> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((res) => {
      if (!res.ok) {
        removeAuthCookie();
        throw new Error("Refresh token required");
      }
    });
  return res;
}

export async function getCurrentAuth(token: string): Promise<UserProfile> {
  try {
    const res = await getUserAuthProfile(token);
    if (res.message) {
      const cookieStore = await cookies();
      const refreshToken: string = cookieStore.get("refreshToken")?.value || "";
      const tokenData = await refreshAccessToken(refreshToken);

      if (tokenData === undefined) {
        removeAuthCookie();
        throw new Error("Refresh token required");
      }

      return await getUserAuthProfile(tokenData.accessToken || "");
    }
    return res;
  } catch (error) {
    removeAuthCookie();
    throw error;
  }
}
