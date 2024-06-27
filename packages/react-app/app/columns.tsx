"use client";

import { ColumnDef } from "@tanstack/react-table";

export type WayToEarn = {
  way: string;
  rewarded: string;
};

export const waysToEarn: WayToEarn[] = [
  {
    way: "Placing an order",
    rewarded: Math.floor(Math.random() * 100) + 1,
  },
  {
    way: "Following on Twitter",
    rewarded: Math.floor(Math.random() * 100) + 1,
  },
  {
    way: "Following on Facebook",
    rewarded: Math.floor(Math.random() * 100) + 1,
  },
  {
    way: "Liking on Twitter",
    rewarded: Math.floor(Math.random() * 100) + 1,
  },
  {
    way: "Liking on Facebook",
    rewarded: Math.floor(Math.random() * 100) + 1,
  },
  {
    way: "Sharing on Twitter",
    rewarded: Math.floor(Math.random() * 100) + 1,
  },
  {
    way: "Sharing on Facebook",
    rewarded: Math.floor(Math.random() * 100) + 1,
  },
].map((way) => ({ ...way, rewarded: `${way.rewarded} rewarded` }));

export const columns: ColumnDef<WayToEarn>[] = [
  {
    accessorKey: "way",
    header: "Ways to earn",
  },
  {
    accessorKey: "rewarded",
    header: "Users rewarded",
  },
];
