"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import { minifuAbi } from "@/blockchain/abi/minifu-abi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { HexToNumberErrorType } from "viem";

export default function ProgramPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { address, isConnected } = useAccount();

  const {
    isPending: isCompletingTask,
    error: isCompletingTaskError,
    writeContractAsync,
  } = useWriteContract();

  const {
    data: program,
    isPending,
    error,
  } = useReadContract({
    address: "0x54C2D4340CBfF5FdFc5276e6fe6071f97E00B433",
    abi: minifuAbi,
    functionName: "getProgram",
    args: [`${params.slug[0]!!}` as `0x${string}`, BigInt(params.slug[1]!!)],
  });

  const {
    data: waysToEarn,
    isPending: waysToEarnPending,
    error: waysToEarnError,
  } = useReadContract({
    address: "0x54C2D4340CBfF5FdFc5276e6fe6071f97E00B433",
    abi: minifuAbi,
    functionName: "getTasks",
    args: [`${params.slug[0]!!}` as `0x${string}`, BigInt(0)],
  });

  async function completeTask(taskId: number) {
    if (!address) return;
    await writeContractAsync({
      address: "0x54C2D4340CBfF5FdFc5276e6fe6071f97E00B433",
      abi: minifuAbi,
      functionName: "completeTask",
      args: [
        `${params.slug[0]!!}` as `0x${string}`,
        BigInt(params.slug[1]!!),
        BigInt(taskId),
      ],
    });
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="p-4">
      <Link href="/home">
        <ArrowLeft className="mb-4 h-6 w-6" />
      </Link>

      <div className="text-sm text-muted-foreground">
        {/* // TODO: Remove this */}

        {!isConnected && <p className="">Connect your wallet</p>}

        {error && <p>Error fetching program, try again later</p>}
      </div>

      {isPending ? (
        <Skeleton className="h-full w-full rounded-xl" />
      ) : (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">{program?.[0]}</h1>
            <p className="text-sm text-muted-foreground">{program?.[1]}</p>
          </div>

          <div>
            <h1 className="text-lg font-semibold">Ways to earn</h1>
            <p className="text-sm text-muted-foreground">
              Complete task below to earn
            </p>
          </div>

          {waysToEarnError && (
            <p>Error fetching ways to earn, try again later</p>
          )}

          {waysToEarnPending ? (
            <Skeleton className="h-full w-full rounded-xl" />
          ) : (
            <div className="flex flex-col gap-6">
              {waysToEarn?.map((wayToEarn, index) => (
                <div className="flex flex-col gap-2" key={index}>
                  <div className="flex">
                    <div className="flex-1">
                      <div className="">{wayToEarn?.name}</div>
                      <p className="text-sm text-muted-foreground">
                        {BigInt(wayToEarn?.points).toString()} points
                      </p>
                    </div>

                    <div className="flex-1">
                      <Button
                        disabled={isCompletingTask || wayToEarn?.customers.includes(address!!)}
                        onClick={() => completeTask(index)}
                        variant="secondary"
                        className=" "
                      >
                        {isCompletingTask ? (
                          <p>Rewarding...</p>
                        ) : (
                          <p>
                            {wayToEarn?.customers.includes(address!!)
                              ? "rewarded"
                              : wayToEarn?.name.split(" ")[0]}
                          </p>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
