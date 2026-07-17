import Link from "next/link";

export function SearhcRow({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link href={href} className={`flex ${className}`}>
      {children}
    </Link>
  );
}
