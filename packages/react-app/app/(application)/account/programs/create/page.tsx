"use client";

import { useAccount, useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { minifuAbi } from "@/blockchain/abi/minifu-abi";

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
    console.log(data); // TODO: Delete this
    try {
        const hash = await writeContractAsync({
            address: "0x54C2D4340CBfF5FdFc5276e6fe6071f97E00B433",
            abi: minifuAbi,
            functionName: "createProgram",
            args: [ data.name as string, data.description as string],
        });
        if(hash) {
            console.log(hash);
            router.push("/account/programs/0")
        } 
    } catch(error) {
        console.log(e);
        toast.error("Failed to lauch program, try again.");
        return
    }
  }

  return (
    // TODO: Add back button & center this

    <main className="flex flex-col gap-3 p-4">
      <div className="">
        <div className="text-xl font-bold">Launch your program</div>
        <p className=" mt-1 text-sm text-muted-foreground">
          Create a new program
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          {/* // TODO: Change this name? to sth else? */}
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Name of your business"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            required
            placeholder="Description of your business"
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Launching..." : "Next"}
        </Button>
      </form>
    </main>
  );
}
