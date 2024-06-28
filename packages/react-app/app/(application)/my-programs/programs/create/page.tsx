"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount, useWriteContract } from "wagmi";

import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CreateProgramPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { isPending, error, writeContractAsync } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      const hash = await writeContractAsync({
        address: "0x9EFF7B69248A16169844ed995C18F14eC1e733F0",
        abi: tuzoAbi,
        functionName: "createProgram",
        args: [data.name as string, data.description as string],
      });
      if (hash) {
        console.log(hash);
        toast.success("Rewards program launched");
      }
    } catch (error) {
      console.log(e);
      toast.error("Failed to lauch your rewards program, try again.");
      return;
    }
  }

  return (
    <main className="flex flex-col">
      <ArrowLeft
        onClick={() => router.back()}
        className="mb-2 h-6 w-6 hover:cursor-pointer"
      />

      <div className="">
        <div className="text-xl font-bold">Launch your rewards program</div>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a new rewards program
        </p>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="tip: include the name of your business"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            required
            placeholder="Description of your rewards program"
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Launching..." : "Launch"}
        </Button>
      </form>
    </main>
  );
}
