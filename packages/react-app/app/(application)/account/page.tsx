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

export default function AccountPage() {
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isMounted) {
    return null
  }

  return (
    <main className="p-4 flex flex-col gap-4">
      <div className="text-3xl font-bold">Account</div>

      {!isConnected && (
          <div className="flex h-screen items-center justify-center">
            <p>Connect your wallet</p>
          </div>
        )}

      <div className="text-lg font-semibold">Launched programs</div>
    </main>
  );
}
