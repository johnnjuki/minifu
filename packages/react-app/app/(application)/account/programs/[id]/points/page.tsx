"use client";

import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";

import { minifuAbi } from "@/blockchain/abi/minifu-abi";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { columns } from "@/app/columns";

type Social = {
  icon: React.ReactElement;
  description: string;
  href: string;
};

const socials: Social[] = [
  {
    icon: <Facebook />,
    description: "Like & follow on Facebook",
    href: "/account/programs/0/points/socials/facebook/like",
  },
  {
    icon: <Twitter />,
    description: "Follow on X",
    href: "/account/programs/0/points/socials/x/follow",
  },
  {
    icon: <Instagram />,
    description: "Follow on Instagram",
    href: "/account/programs/0/points/socials/instagram/follow",
  },
];

export default function PointsPage() {
  const { address, isConnected } = useAccount();

  const {
    data: waysToEarn,
    isPending,
    error,
  } = useReadContract({
    address: "0x2211d2aB752c6c1b73661F540Df381B5b052F284",
    abi: minifuAbi,
    functionName: "getTasks",
    args: [address!!, BigInt(0)],
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="">
      <p className="mb-4 mt-1 text-sm text-muted-foreground">
        Create ways to earn when customers engage with your brand.
      </p>

      {isPending ? (
        <Skeleton className="h-[250px] w-[250px] rounded-xl" />
      ) : (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="mb-2 w-fit" size="sm">
                Add ways to earn
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Social</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-6">
                {socials
                  .filter((social) => {
                    return !waysToEarn!!.some(
                      (wayToEarn) => wayToEarn.name === social.description,
                    );
                  })
                  .map((social, index) => (
                    <Link href={social.href} key={index} className="">
                      <div className="flex items-center space-x-5">
                        {social.icon}
                        <span>{social.description}</span>
                      </div>
                      <Separator className="mt-4" />
                    </Link>
                  ))}
              </div>
            </DialogContent>
          </Dialog>

          <DataTable columns={columns} data={[...waysToEarn!!]} />
        </>
      )}
    </main>
  );
}
