"use client";

import Link from "next/link";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";

type ContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  close: () => void;
  open: () => void;
};

const storeContext = createContext<ContextType | null>(null);

export function useModel() {
  const context = useContext(storeContext);
  if (!context) throw new Error("useModel must be used within a Model");
  return context;
}

// Parent Component
function Model({
  children,
  className,
  onCloseAction,
  ...props
}: React.ComponentProps<"div"> & {
  onCloseAction?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  function close() {
    setIsOpen(false);
    onCloseAction?.();
  }
  function open() {
    setIsOpen(true);
  }
  return (
    <storeContext.Provider value={{ isOpen, open, close, setIsOpen }}>
      <div className={`${className}`} {...props}>
        {children}
      </div>
    </storeContext.Provider>
  );
}

export function Trigger({
  children,
  variant,
  className,
  type = "button",
}: {
  children: React.ReactElement;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive";
  className?: string;
  type?: "button" | "div";
}) {
  const { open } = useModel();
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == "Enter" || e.key == " ") {
      e.preventDefault();
      open();
    }
  };
  return (
    <>
      {type === "button" && (
        <Button variant={variant} className={className} onClick={open}>
          {children}
        </Button>
      )}
      {type === "div" && (
        <div
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={handleKeyDown}
          className="flex-1 cursor-pointer"
        >
          {children}
        </div>
      )}
    </>
  );
}

export function Content({
  children,
  className,
  contentHeight,
}: {
  children: React.ReactNode;
  className?: string;
  contentHeight?: string;
}) {
  const { isOpen, close } = useModel();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Native Dialog LifeCycle
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // prevent closing when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimension = dialogRef.current?.getBoundingClientRect();
    if (!dialogDimension) return;
    if (
      dialogDimension &&
      (e.clientX < dialogDimension.left ||
        e.clientX > dialogDimension.right ||
        e.clientY < dialogDimension.top ||
        e.clientY > dialogDimension.bottom)
    ) {
      close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={close} // بيغطي حالة الـ ESC key تلقائياً
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
      className={`
        text-foreground
        fixed inset-0 z-50 m-auto
        flex flex-col w-[80%] max-w-2xl rounded-lg shadow-md bg-background
        focus-visible:outline-none
        backdrop:bg-secondary/80 backdrop:backdrop-blur-sm
        ${contentHeight ? contentHeight : "h-2/3"}
        ${className}
        ${!isOpen && "hidden"}
      `}
    >
      <Button
        onClick={close}
        variant={"ghost"}
        className="absolute top-4 right-4 z-50"
      >
        X
      </Button>
      {children}
    </dialog>
  );
}

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex sticky top-0 z-50 justify-center w-full rounded-t-lg bg-background">
      {/* الـ ID ده بيربط العنوان بالـ dialog للـ Screen Readers */}
      <div
        id="modal-title"
        className="py-5 px-2 w-[80%] md:w-2/3 border-b md:p-4 lg:p-8 border-border"
      >
        {children}
      </div>
    </div>
  );
}

export function LinkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { close } = useModel();
  return (
    <Link href={href} onClick={close} className={className}>
      {children}
    </Link>
  );
}

export function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex overflow-y-auto flex-col flex-1 items-center px-2 py-3 ${className}`}
    >
      {children}
    </div>
  );
}

export function ModelButton({
  content,
  type,
  className,
  func,
}: {
  content: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  func?: () => void;
}) {
  const { close } = useModel();

  function handleClick() {
    func?.();
    close();
  }
  return (
    <Button type={type} onClick={handleClick} className={className}>
      {content}
    </Button>
  );
}

Model.Trigger = Trigger;
Model.Header = Header;
Model.Content = Content;
Model.Body = Body;
Model.Button = ModelButton;
Model.LinkButton = LinkButton;
export default Model;
