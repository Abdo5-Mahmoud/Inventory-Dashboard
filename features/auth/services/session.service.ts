import { cookies } from "next/headers";

export async function getSessionUser() {
  const cookiesStore = await cookies();
  const userData = cookiesStore.get("user")?.value;
  try {
    return JSON.parse(userData || "{}");
  } catch {
    return {};
  }
}
