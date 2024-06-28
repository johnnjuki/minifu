"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useReadContract, useAccount } from "wagmi";

const { minifuAbi } = require("@/blockchain/abi/minifu-abi");

export default function MyRewardsPage() {
  const { address, isConnected } = useAccount();

  const {
    data: points,
    isPending,
    error,
  } = useReadContract({
    address: "0x2211d2aB752c6c1b73661F540Df381B5b052F284",
    abi: minifuAbi,
    functionName: "getTotalPoints",
    args: [address!!],
  });

  return (
    <main>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Rewards</h1>
        <p className="text-sm text-muted-foreground">
          All rewards you have earned
        </p>
      </div>

      <div className="text-sm text-muted-foreground">
        {/* // TODO: Remove this */}

        {!isConnected && (
          <p className="">Connect your wallet to see your programs</p>
        )}

        {error && <p>Error fetching programs, try again later</p>}
      </div>

      {isPending ? (
        <Skeleton className="h-[250px] w-[250px] rounded-xl" />
      ) : (
        <div className="">
            {
              points ? <p>Points: {BigInt(points as number).toString()}</p> : <p>No points yet</p>
            }
           

        </div>
      )}
    </main>
  );
}
