"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { Gift, Home, User } from "lucide-react";
import Link from "next/link";

const NavItem = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <Link
    href={href}
    className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
  >
    <Icon className="h-6 w-6" />
    <span className="text-xs font-medium">{label}</span>
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="p-4">
          {/* <h1 className="mb-4 text-2xl font-bold">Welcome to the Events App</h1>
          <p className="mb-8 text-gray-500">
            Discover, create, and manage events all in one place.
          </p> */}

          {children}
        </div>
      </main>
      {/* // TODO: when in selected nav, bold */}
      <nav
        className={
          cn("flex items-center justify-between bg-white px-4 py-2",
          pathname?.startsWith("/account/programs/") && "hidden")
        }
      >
        <NavItem href="/home" icon={Home} label="Home" />
        <NavItem href="/my-rewards" icon={Gift} label="My Rewards" />
        <NavItem href="/account" icon={User} label="Account" />
      </nav>
    </div>
  );
}
