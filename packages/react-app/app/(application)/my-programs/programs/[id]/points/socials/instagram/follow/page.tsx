"use client";

import { useWriteContract } from "wagmi";

import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InstagramFollowPage({
  params,
}: {
  params: { id: number };
}) {
  const { isPending, error, writeContractAsync } = useWriteContract();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const hash = await writeContractAsync({
        address: "0x2BAeeBf78342c84de0833b605beaFC94A1DC4b99",
        abi: tuzoAbi,
        functionName: "addTask",
        args: [
          BigInt(params.id),
          "Follow on Instagram",
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
      <div className="text-xl font-bold">Follow on Instagram</div>
      <p className="text-sm text-muted-foreground">
        Provide the URL of your Instagram business page where your customers can
        follow you.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg">Social link</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="url">URL</Label>
            <Input id="url" name="url" required type="url" />
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
              pattern="^(https?:\/\/)?(instagram\.com)$"
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
