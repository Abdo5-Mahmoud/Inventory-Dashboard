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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: token,
      expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      removeAuthCookie();
      throw new Error("Refresh token required");
    });
  return res;
}

export async function getCurrentAuth({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}): Promise<UserProfile | undefined> {
  try {
    const res = await getUserAuthProfile(token);
    if (res.message) {
      const tokenData = await refreshAccessToken(refreshToken);

      if (!tokenData?.accessToken) {
        removeAuthCookie();
        return;
      } else {
        setAuthCookie(tokenData);

        return await getUserAuthProfile(tokenData.accessToken);
      }
    }
    return res;
  } catch (error) {
    removeAuthCookie();
    throw error;
  }
}
