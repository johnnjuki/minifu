import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export type SocialsLayoutProps = {
  children: React.ReactNode;
};

export default function SocialsLayout({ children }: SocialsLayoutProps) {
  return <div>{children}</div>;
}
