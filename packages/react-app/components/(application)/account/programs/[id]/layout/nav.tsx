"use client";

import type { HTMLAttributes } from "react";
import { Gift, PartyPopper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type NavProps = HTMLAttributes<HTMLDivElement>;

export const Nav = ({ className, ...props }: NavProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-start gap-x-2 gap-y-4",
        className,
      )}
      {...props}
    >
      {/* // TODO: refactor this href */}
      <Link href="/account/programs/0/points">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            pathname?.startsWith("/account/programs/0/points") &&
              "bg-secondary",
          )}
        >
          <Gift className="mr-2 h-5 w-5" />
          <span className={cn(pathname.startsWith("/account/programs/0/points") && "font-semibold")}>Points</span>
        </Button>
      </Link>
      <Link href="/account/programs/0/redeem">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            pathname?.startsWith("/account/programs/0/redeem") &&
              "bg-secondary",
          )}
        >
          <PartyPopper className="mr-2 h-5 w-5" />
          <span className={cn(pathname.startsWith("/account/programs/0/redeem") && "font-semibold")}>Redeem</span>
        </Button>
      </Link>
    </div>
  );
};
