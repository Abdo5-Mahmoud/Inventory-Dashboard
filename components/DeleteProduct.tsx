"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteProductMutation } from "@/hooks/useDeleteProductMutation";
import { Button } from "./ui/button";

export function DeleteTheProduct({ id, title }: { id: number; title: string }) {
  const { mutate: deleteTheProduct } = useDeleteProductMutation();
  function handleDelete() {
    deleteTheProduct({ id });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex-1">
          Delete product
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {title}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel variant="secondary">Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive" onClick={handleDelete}>
          Delete
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}
