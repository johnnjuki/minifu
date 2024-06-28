"use client";

import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";

import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";
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

export default function PointsPage({
  params,
}: {
  params: { id: number };
}) {
  const { address, isConnected } = useAccount();


const socials: Social[] = [
  {
    icon: <Facebook />,
    description: "Like & follow on Facebook",
    href: `/my-programs/programs/${params.id}/points/socials/facebook/like`,
  },
  {
    icon: <Twitter />,
    description: "Follow on X",
    href: `/my-programs/programs/${params.id}/points/socials/x/follow`,
  },
  {
    icon: <Instagram />,
    description: "Follow on Instagram",
    href: `/my-programs/programs/${params.id}/points/socials/instagram/follow`,
  },
];

  const {
    data: waysToEarn,
    isPending,
    error,
  } = useReadContract({
    address: "0x2BAeeBf78342c84de0833b605beaFC94A1DC4b99",
    abi: tuzoAbi,
    functionName: "getTasks",
    args: [address!!, BigInt(params.id)],
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
        Add ways to earn when customers engage with your brand.
      </p>

      {isPending ? (
        <Skeleton className="h-[350px] w-[350px] rounded-xl" />
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
