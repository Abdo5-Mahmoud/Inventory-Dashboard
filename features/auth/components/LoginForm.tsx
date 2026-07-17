"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LoginAction } from "../actions/auth.service";
import { LoginSchema } from "../schemas/login.schema";
import { LoginRequest } from "../types/auth.types";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });
  async function onSubmit(formData: LoginRequest) {
    const { message, status } = await LoginAction(formData);

    if (status === 200) {
      router.replace("/");
      toast("Logged in successfully!", { type: "success" });
      return;
    }
    if (status === 400) return toast(message, { type: "error" });
  }
  return (
    <form
      name="create product form"
      id="form-create-product"
      className="flex flex-col gap-6 p-8 pt-10 rounded-lg bg-background"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldSet>
        <FieldLegend className="flex gap-2 items-center">Log In</FieldLegend>

        <FieldGroup className="gap-6 mt-6">
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              {...register("username")}
              placeholder="username"
              id="username"
              type="text"
            />
            {errors.username && (
              <p className="text-destructive">{errors.username.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              {...register("password")}
              placeholder="password"
              id="password"
              type="password"
            />
            {errors.password && (
              <p className="text-destructive">{errors.password.message}</p>
            )}
          </Field>
          <Field>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
