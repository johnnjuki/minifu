"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";

import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";
import { Nav } from "@/components/(application)/account/programs/[id]/layout/nav";
import { Skeleton } from "@/components/ui/skeleton";

export type ProgramLayoutProps = {
  children: React.ReactNode;
  params: { id: number };
};

export default function ProgramLayout({
  children,
  params,
}: ProgramLayoutProps) {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const {
    data: program,
    isPending,
    error,
  } = useReadContract({
    address: "0x2BAeeBf78342c84de0833b605beaFC94A1DC4b99",
    abi: tuzoAbi,
    functionName: "getProgram",
    args: [address!!, BigInt(params.id)],
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  return (
    <main className="">
      <ArrowLeft onClick={() => router.back()} className="mb-4 h-6 w-6 hover:cursor-pointer" />

      <div className="text-sm text-muted-foreground">
        {/* // TODO: Remove this */}

        {!isConnected && (
          <p className="">Connect your wallet to see your program</p>
        )}

        {error && <p>Error fetching program, try again later</p>}
      </div>

      {isPending ? (
        <Skeleton className="h-[400px] w-[350px] rounded-xl" />
      ) : (
        <div>
          <h1 className="text-2xl font-bold">{program?.[1]}</h1>
          <p className="text-sm text-muted-foreground">{program?.[2]}</p>

          <Nav id={params.id} />

          {children}
        </div>
      )}
    </main>
  );
}
