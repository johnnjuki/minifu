"use client";

import { ColumnDef } from "@tanstack/react-table";

export type WayToEarn = {
  name: string;
  url: string;
  points: bigint;
  totalCustomers: bigint;
};

export const columns: ColumnDef<WayToEarn>[] = [
  {
    accessorKey: "name",
    header: "Ways to earn",
  },
  {
    accessorKey: "totalCustomers",
    header: "Users rewarded",
  },
  
];
