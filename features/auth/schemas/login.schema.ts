import * as z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Username must be at least 2 characters long." })
    .trim()
    .nonempty("Username is required"),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .trim()
    .nonempty("Password is required")
    // .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    // .regex(/[0-9]/, { error: "Contain at least one number." })
    // .regex(/[^a-zA-Z0-9]/, {
    //   error: "Contain at least one special character.",
    // })
    .trim(),
});
