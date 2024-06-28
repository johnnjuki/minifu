"use client";

import {
  GiftIcon,
  PackageIcon,
  ShipIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useReadContract, useAccount } from "wagmi";
import { useEffect, useState } from "react";

import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const rewards = [
  {
    id: 1,
    icon: <ShoppingCartIcon className="h-8 w-8" />,
    title: "Discount",
    description: "Redeem for 10% off",
  },
  {
    id: 2,
    icon: <ShipIcon className="h-8 w-8" />,
    title: "Free Shipping",
    description: "Redeem for free shipping",
  },
  {
    id: 3,
    icon: <PackageIcon className="h-8 w-8" />,
    title: "Free Product",
    description: "Redeem for a free product",
  },
  {
    id: 4,
    icon: <GiftIcon className="h-8 w-8" />,
    title: "Gift Card",
    description: "Redeem for a gift card",
  },
];

export default function MyRewardsPage() {
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: points,
    isPending,
    error,
  } = useReadContract({
    address: "0x9EFF7B69248A16169844ed995C18F14eC1e733F0",
    abi: tuzoAbi,
    functionName: "getTotalPoints",
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
      <div className="">
        <h1 className="text-3xl font-bold">Rewards</h1>
        <p className="text-sm text-muted-foreground">
          You have no rewards yet. Redeem points for rewards
        </p>
      </div>

      {!isConnected && (
        <p className="text-sm text-muted-foreground">
          Connect your wallet to see your programs
        </p>
      )}

      {error && (
        <p className="text-sm text-muted-foreground">
          Error fetching programs, try again later
        </p>
      )}

      {isPending ? (
        <Skeleton className="h-[350px] w-[350px] rounded-xl" />
      ) : (
        <div className="flex flex-col gap-3">
          <div>
            {points ? (
              <p className="font-medium">
                Your Points: {BigInt(points).toString()}
              </p>
            ) : (
              <p>No points yet</p>
            )}
          </div>

          <div className="mt-2 grid grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex flex-col items-center gap-2 rounded-lg bg-card p-4 text-card-foreground"
              >
                {reward.icon}
                <h3 className=" font-medium">{reward.title}</h3>
                <p className="text-center text-sm text-muted-foreground">
                  {reward.description}
                </p>
                <Button disabled size="sm">
                  Redeem
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
