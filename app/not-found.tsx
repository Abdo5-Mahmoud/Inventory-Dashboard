// Not Found Component

import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";

export default function NotFound() {
  return (
    <EmptyState msg="The Route You are looking for not exist yet">
      <Link className="p-3 rounded-full border hover:bg-primary" href={"/"}>
        Go Home
      </Link>
    </EmptyState>
  );
}
