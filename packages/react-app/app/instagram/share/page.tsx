import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InstagramSharePage() {
  return (
    <main className="p-2">
      {/* // TODO: Add back button */}
      <div className="text-xl font-bold">Share on Instagram</div>

      <form className="flex flex-col space-y-4 mt-4">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg">Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="url">Any URL</Label>
              <Input
                id="url"
                required
                type="url"
                placeholder="e.g. a link to a product on your website"
                pattern="^(https?:\/\/)?(instagram\.com)$"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                required
                placeholder="e.g. description of the product"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg">Points to earn</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="url">Points</Label>
            <Input id="url" type="number" required defaultValue={50} />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="w-fit">
            Add
          </Button>
        </div>
      </form>
    </main>
  );
}
