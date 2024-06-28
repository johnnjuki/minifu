"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProgramPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const router = useRouter();
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
    address: "0x9EFF7B69248A16169844ed995C18F14eC1e733F0",
    abi: tuzoAbi,
    functionName: "getProgram",
    args: [`${params.slug[0]!!}` as `0x${string}`, BigInt(params.slug[1]!!)],
  });

  const {
    data: waysToEarn,
    isPending: waysToEarnPending,
    error: waysToEarnError,
  } = useReadContract({
    address: "0x9EFF7B69248A16169844ed995C18F14eC1e733F0",
    abi: tuzoAbi,
    functionName: "getTasks",
    args: [`${params.slug[0]!!}` as `0x${string}`, BigInt(params.slug[1]!!)],
  });

  async function completeTask(taskId: number) {
    if (!address) return;
    const hash = await writeContractAsync({
      address: "0x9EFF7B69248A16169844ed995C18F14eC1e733F0",
      abi: tuzoAbi,
      functionName: "completeTask",
      args: [
        `${params.slug[0]!!}` as `0x${string}`,
        BigInt(params.slug[1]!!),
        BigInt(taskId),
      ],
    });

    if (hash) {
      router.push("/my-rewards");
    }
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="">
      <Link href="/home">
        <ArrowLeft className="mb-4 h-6 w-6" />
      </Link>

      <div className="text-sm text-muted-foreground">
        {/* // TODO: Remove this */}

        {!isConnected && <p className="">Connect your wallet</p>}

        {error && <p>Error fetching program, try again later</p>}
      </div>

      {isPending ? (
        <Skeleton className="h-[20px] w-full rounded-xl" />
      ) : (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">{program?.[1]}</h1>
            <p className="text-sm text-muted-foreground">{program?.[2]}</p>
          </div>

          <div>
            <h1 className="text-lg font-semibold">Ways to earn</h1>
            <p className="text-sm text-muted-foreground">
              Complete tasks below to earn points
            </p>
          </div>

          {waysToEarnError && (
            <p>Error fetching ways to earn, try again later</p>
          )}

          {waysToEarnPending ? (
            <Skeleton className="h-[350px] w-full rounded-xl" />
          ) : (
            <>
              {waysToEarn?.length === 0 && (
                <div className="">
                  <p className="text-muted-foreground">
                    No ways to earn added yet
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-6">
                {waysToEarn?.map((wayToEarn, index) => (
                  <div className="" key={index}>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <div className="">{wayToEarn?.name}</div>
                        <p className="text-sm text-muted-foreground">
                          {BigInt(wayToEarn?.points).toString()} points
                        </p>
                      </div>

                      <Button
                        disabled={
                          isCompletingTask ||
                          wayToEarn?.customers.includes(address!!)
                        }
                        onClick={() => completeTask(index)}
                        variant="secondary"
                        className="flex-1"
                      >
                        <p>
                          {wayToEarn?.customers.includes(address!!)
                            ? "rewarded"
                            : wayToEarn?.name.split(" ")[0]}
                        </p>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
