"use client";

import { useWriteContract } from "wagmi";

import { minifuAbi } from "@/blockchain/abi/minifu-abi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InstagramFollowPage() {
  const { isPending, error, writeContractAsync } = useWriteContract();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const hash = await writeContractAsync({
        address: "0x2211d2aB752c6c1b73661F540Df381B5b052F284",
        abi: minifuAbi,
        functionName: "addTask",
        args: [
          BigInt(0),
          "Follow on Instagram",
          data.url as string,
          BigInt(data.points as string),
        ],
      });
      if (hash) {
        console.log(hash);
        toast.success("Way to earn added");
        // TODO: Redirect
      }
    } catch (error) {
      console.log(e);
      toast.error("Failed to create task, try again.");
      return;
    }
  }

  return (
    <main className="p-2">
      {/* // TODO: Add back button */}
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
