"use client";

import Link from "next/link";
import { useReadContract, useAccount } from "wagmi";

import { minifuAbi } from "@/blockchain/abi/minifu-abi";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { address, isConnected } = useAccount();

  const {
    data: programs,
    isPending,
    error,
  } = useReadContract({
    address: "0x54C2D4340CBfF5FdFc5276e6fe6071f97E00B433",
    abi: minifuAbi,
    functionName: "getAllPrograms",
  });

  return (
    <main className="flex flex-col gap-6">
        <div>

      <h1 className="text-2xl font-bold">Loayalty Programs</h1>
      <p className="text-sm text-muted-foreground">
        All loyalty programs added
      </p>

        </div>
      {!isConnected ? (
        <div className="">
          <p>Connect your wallet to see programs</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="">
              <p>
                Error fetching programs. Check your internet connection or try
                again later.
              </p>
            </div>
          )}

          {isPending ? (
            <Skeleton className=" h-[250px] rounded-xl" />
          ) : (
            <>
              {programs?.length === 0 && (
                <div className="">
                  <p className="text-muted-foreground">No Loyalty programs found</p>
                </div>
              )}

              {/* TODO: Add button for user to launch their loyalty program from here */}
              <div className="grid grid-cols-1 gap-6">
                {programs?.map((program, index) => (
                  <Link href={`/program/${program.owner}/${index}`} key={index}>
                    <div className="h-32 rounded-xl  border-muted-foreground bg-muted p-4">
                      <h2 className="text-lg font-semibold">{program.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {program.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
