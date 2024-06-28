"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GiftIcon } from "lucide-react";

export default function AccountPage() {
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: programs,
    isPending,
    error,
  } = useReadContract({
    address: "0x9EFF7B69248A16169844ed995C18F14eC1e733F0",
    abi: tuzoAbi,
    functionName: "getProgramsByOwner",
    args: [address!!],
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="text-3xl font-bold">My Programs</div>

      <p className="text-sm text-muted-foreground">
        Your launched rewards programs
      </p>

      <div className="text-sm text-muted-foreground">
        {/* // TODO: Remove this */}

        {!isConnected && (
          <p className="">Connect your wallet to see your programs</p>
        )}

        {error && <p>Error fetching programs, try again later</p>}

        {programs?.length === 0 && (
          <div className="flex flex-col space-y-4">
            <p className="">You have not launched any rewards program yet</p>
            <Link href="/my-programs/programs/create">
              {" "}
              <Button className="w-fit">Launch Now</Button>
            </Link>
          </div>
        )}
      </div>

      {isPending ? (
        <Skeleton className="h-[250px] w-[350px] rounded-xl" />
      ) : (
        <div className="grid gap-4">
          {/* // TODO: Create a program type */}
          {programs?.map((program: any, index) => (
            <Link href={`/my-programs/programs/${program.programId}/points`} key={index}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <GiftIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                  <h3 className="mb-1 text-lg font-bold">{program.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {program.description}
                  </p>
                  <Button variant="outline" className="mt-4">
                    View
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
