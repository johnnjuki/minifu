"use client";

import type { HTMLAttributes } from "react";
import { Gift, PartyPopper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// export type NavProps = HTMLAttributes<HTMLDivElement>;

export const Nav = ({ id }: { id: number }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "mb-4 mt-6 flex flex-wrap items-center justify-start gap-x-2 gap-y-4",
      )}
    >
      <Link href={`/my-programs/programs/${id}/points`}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            pathname?.startsWith(`/my-programs/programs/${id}/points`) &&
              "bg-secondary",
          )}
        >
          <Gift className="mr-2 h-5 w-5" />
          <span
            className={cn(
              pathname.startsWith(`/my-programs/programs/${id}/points`) &&
                "font-semibold",
            )}
          >
            Points
          </span>
        </Button>
      </Link>
      <Link href={`/my-programs/programs/${id}/redeem`}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            pathname?.startsWith(`/my-programs/programs/${id}/redeem`) &&
              "bg-secondary",
          )}
        >
          <PartyPopper className="mr-2 h-5 w-5" />
          <span
            className={cn(
              pathname.startsWith(`/my-programs/programs/${id}/redeem`) &&
                "font-semibold",
            )}
          >
            Redeem
          </span>
        </Button>
      </Link>
    </div>
  );
};
