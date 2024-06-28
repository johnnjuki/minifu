"use client";

import { useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";

import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function XFollowPage({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const { isPending, error, writeContractAsync } = useWriteContract();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const hash = await writeContractAsync({
        address: "0x9EFF7B69248A16169844ed995C18F14eC1e733F0",
        abi: tuzoAbi,
        functionName: "addTask",
        args: [
          BigInt(params.id),
          "Follow on X",
          data.url as string,
          BigInt(data.points as string),
        ],
      });
      if (hash) {
        console.log(hash);
        toast.success("Way to earn added");
      }
    } catch (error) {
      console.log(e);
      toast.error("Failed to create task, try again.");
      return;
    }
  }

  return (
    <main className="p-2">
      <div className="text-xl font-bold">Follow on X</div>
      <p className="text-sm text-muted-foreground">
        Provide the URL of your X business profile where your customers can
        follow you.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg">Social link</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              required
              type="url"
              pattern="^(https?:\/\/)?(twitter\.com|x\.com)$"
            />
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg">Points to earn</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="url">Points</Label>
            <Input
              id="points"
              name="points"
              type="number"
              required
              defaultValue={50}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button disabled={isPending} type="submit" className="w-fit">
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
    </main>
  );
}
