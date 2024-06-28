import { Button } from "@/components/ui/button";
import {
  GiftIcon,
  PackageIcon,
  ShipIcon,
  ShoppingCartIcon,
} from "lucide-react";

const rewards = [
  {
    id: 1,
    icon: <ShoppingCartIcon className="h-8 w-8" />,
    title: "Discount",
    description: "Redeem for 10% off",
  },
  {
    id: 2,
    icon: <ShipIcon className="h-8 w-8" />,
    title: "Free Shipping",
    description: "Redeem for free shipping",
  },
  {
    id: 3,
    icon: <PackageIcon className="h-8 w-8" />,
    title: "Free Product",
    description: "Redeem for a free product",
  },
  {
    id: 4,
    icon: <GiftIcon className="h-8 w-8" />,
    title: "Gift Card",
    description: "Redeem for a gift card",
  },
];

export default function RedeemPage() {
  return (
    <main className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Add ways your customers can redeem the points they have earned.
      </p>
      <div className="mt-2 grid grid-cols-2 gap-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="flex flex-col items-center gap-2 rounded-lg bg-card p-4 text-card-foreground"
          >
            {reward.icon}
            <h3 className="font-medium">{reward.title}</h3>
            <p className="text-center text-sm text-muted-foreground">
              {reward.description}
            </p>
            <Button disabled size="sm">
              Add
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
