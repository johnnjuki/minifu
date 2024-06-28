"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { Gift, Home, User } from "lucide-react";
import Link from "next/link";

const NavItem = ({
  href,
  pathname,
  icon: Icon,
  label,
}: {
  pathname: string;
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <Link href={href} className="text-gray-500 hover:text-gray-900">
    <div
      className={cn(
        "flex flex-col items-center gap-1",
        pathname.startsWith(href) && "text-gray-900",
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="p-4">{children}</div>
      </main>
      {/* // TODO: when in selected nav, bold */}
      <nav
        className={cn(
          "flex items-center justify-between bg-white px-4 py-2",
          pathname?.startsWith("/account/programs/") && "hidden",
        )}
      >
        <NavItem pathname={pathname} href="/home" icon={Home} label="Home" />
        <NavItem
          pathname={pathname}
          href="/my-rewards"
          icon={Gift}
          label="My Rewards"
        />
        <NavItem
          pathname={pathname}
          href="/account"
          icon={User}
          label="Account"
        />
      </nav>
    </div>
  );
}
