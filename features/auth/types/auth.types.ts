import { LoginSchema } from "../schemas/login.schema";
import * as z from "zod";

export type LoginResponse = {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
  message?: string;
};
export type RefreshResponse = Pick<
  LoginResponse,
  "accessToken" | "refreshToken" | "message"
>;

export type LoginRequest = z.infer<typeof LoginSchema>;

export type UserProfile = Omit<LoginResponse, "accessToken" | "refreshToken">;
