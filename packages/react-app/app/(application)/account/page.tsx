"use client";

import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { minifuAbi } from "@/blockchain/abi/minifu-abi";

export default function AccountPage() {
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: programs,
    isPending,
    error,
  } = useReadContract({
    address: "0x54C2D4340CBfF5FdFc5276e6fe6071f97E00B433",
    abi: minifuAbi,
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
    <main className="flex flex-col gap-4 p-4">
      <div className="text-3xl font-bold">Account</div>

      <div className="text-lg font-semibold">Your launched programs</div>

      <div className="text-sm text-muted-foreground">
        {/* // TODO: Remove this */}

        {!isConnected && (
          <p className="">Connect your wallet to see your programs</p>
        )}

        {error && <p>Error fetching programs, try again later</p>}

        {programs?.length === 0 && (
          <div className="flex flex-col space-y-4">
            <p className="">You have not launched any loyalty program yet</p>
           <Link href="/account/programs/create"> <Button className="w-fit">Launch Now</Button></Link>
          </div>
        )}
      </div>

      {isPending ? (
        <Skeleton className="h-[250px] w-[250px] rounded-xl" />
      ) : (
        <div className="grid gap-4">
          {/* // TODO: Create a program type */}
          {programs?.map((program: any, index) => (
            <Link
              href={`/account/programs/${index}`}
              key={index}
            >
              <Card className="w-[250px]">
                <CardHeader>
                  <CardTitle>{program.name}</CardTitle>
                  <CardDescription>
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* TODO: show number of people rewarded */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
