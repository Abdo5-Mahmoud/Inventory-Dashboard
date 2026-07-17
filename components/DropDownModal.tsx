"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";

import { useContext } from "react";

type ContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const defaultValue = {
  isOpen: false,
  setIsOpen: () => {},
};

const storeContext = createContext<ContextType>(defaultValue);

function DropDownModel({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <storeContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="z-60">{children}</div>
    </storeContext.Provider>
  );
}

export function Trigger({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = useContext(storeContext);
  return (
    <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
      {children}
    </div>
  );
}

export function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, setIsOpen } = useContext(storeContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    const keyboardEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", keyboardEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", keyboardEsc);
    };
  }, [setIsOpen]);
  if (!isOpen) return null;
  return (
    <div
      className={`flex absolute inset-0 z-10 justify-center items-center w-full h-full bg-secondary/80 ${className}`}
    >
      <div
        ref={ref}
        className="absolute right-0 top-10 w-64 rounded-sm border bg-popover border-border text-muted-foreground"
      >
        {children}
      </div>
    </div>
  );
}

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex sticky top-0 z-50 justify-center w-full rounded-t-lg bg-background">
      <div className="py-5 px-2 w-[80%]  md:w-2/3 border-b md:p-4 lg:p-8 border-border">
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
  const { setIsOpen } = useContext(storeContext);
  return (
    <Link
      href={href}
      onClick={() => {
        setIsOpen(false);
      }}
      className={`flex gap-4 px-4 py-2 rounded-sm hover:bg-muted ${className}`}
    >
      {children}
    </Link>
  );
}
export function Button({
  children,
  className,
  type,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  action?: () => void;
}) {
  const { setIsOpen } = useContext(storeContext);
  return (
    <button
      onClick={() => {
        action?.();
        setIsOpen(false);
      }}
      type={type}
      className={`flex gap-4 px-4 py-2 rounded-sm hover:bg-muted ${className}`}
    >
      {children}
    </button>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return <div className="overflow-y-auto flex-1 px-2 py-3">{children}</div>;
}

export function Footer({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

DropDownModel.Header = Header;
DropDownModel.Content = Content;
DropDownModel.Body = Body;
DropDownModel.Footer = Footer;
DropDownModel.LinkButton = LinkButton;
DropDownModel.Trigger = Trigger;
DropDownModel.ActionButton = Button;

export default DropDownModel;
