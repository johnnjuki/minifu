import Image from "next/image";
import Link from "next/link";

import { WayToEarn, waysToEarn, columns } from "../../../../../columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Facebook, Instagram, Twitter, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Social = {
  icon: React.ReactElement;
  description: string;
  href: string;
};

 const socials: Social[] = [
  {
    icon: <Facebook />,
    description: "Like & follow on Facebook",
    href: "/facebook/like",
  },
  {
    icon: <Facebook />,
    description: "Share on Facebook",
    href: "/facebook/share"
  },
  {
    icon: <Twitter />,
    description: "Follow on X",
    href: "/x/follow",
  },
  {
    icon: <Twitter />,
    description: "Share on X",
    href: "/x/share",
  },
  {
    icon: <Instagram />,
    description: "Follow on Instagram",
    href: "/instagram/follow",
  },
  {
    icon: <Instagram />,
    description: "Share on Instagram",
    href: "/instagram/share",
  },
];

async function getData(): Promise<WayToEarn[]> {
  return waysToEarn;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="p-2">
      <div className="text-xl font-bold">Earn points</div>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        Create ways to earn when customers engage with your brand
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-fit mb-2" size="sm">
            Add ways to earn
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Social</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-6">
            {socials.map((social, index) => (
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

      <DataTable columns={columns} data={data} />
    </main>
  );
}
