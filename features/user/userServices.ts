import { UserType } from "./types";

export async function getUserByid({ id }: { id: number }): Promise<UserType> {
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user data from dummyjson");
  const data = await response.json();
  return data;
}
