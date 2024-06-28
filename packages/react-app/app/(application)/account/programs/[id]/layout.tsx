"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";

import { minifuAbi } from "@/blockchain/abi/minifu-abi";
import { Nav } from "@/components/(application)/account/programs/[id]/layout/nav";
import { Skeleton } from "@/components/ui/skeleton";

export type ProgramLayoutProps = {
  children: React.ReactNode;
};

export default function ProgramLayout({ children }: ProgramLayoutProps) {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const {
    data: program,
    isPending,
    error,
  } = useReadContract({
    address: "0x54C2D4340CBfF5FdFc5276e6fe6071f97E00B433",
    abi: minifuAbi,
    functionName: "getProgram",
    args: [address!!, BigInt(0)],
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  return (
    <main className="p-4">

      <Link href="/account">
        <ArrowLeft className="mb-4 h-6 w-6" />
      </Link>

      <div className="text-sm text-muted-foreground">
        {/* // TODO: Remove this */}

        {!isConnected && (
          <p className="">Connect your wallet to see your program</p>
        )}

        {error && <p>Error fetching program, try again later</p>}
      </div>

      {isPending ? (
        <Skeleton className="h-full w-full rounded-xl" />
      ) : (
        <div>
          <h1 className="text-2xl font-bold">{program?.[0]}</h1>
          <p className="text-sm text-muted-foreground">{program?.[1]}</p>

          <Nav className="mb-4 mt-6" />

          {children}
        </div>
      )}
    </main>
  );
}
