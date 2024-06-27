"use client";

import { useAccount, useReadContract } from "wagmi";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { minifuAbi } from "@/blockchain/abi/minifu-abi";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Nav } from "@/components/(application)/account/programs/[id]/layout/nav";

export type MyProgramLayoutProps = {
  children: React.ReactNode;
};

export default function MyProgramLayout({ children }: MyProgramLayoutProps) {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const {
    data: program,
    isPending,
    error,
  } = useReadContract({
    address: "0x14C08F73c800D278321813F1AA56Fa2F2aeF700F",
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
      {/* TODO: Add back button */}

      <Link href="/account">
        <ArrowLeft className="mb-4 h-6 w-6" />
      </Link>

      <div className="text-sm text-muted-foreground">
        {/* // TODO: Remove this */}

        {!isConnected && (
          <p className="">Connect your wallet to see your programs</p>
        )}

        {error && <p>Error fetching programs, try again later</p>}
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
