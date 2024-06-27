import { redirect } from "next/navigation";

export default function MyProgramDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  // TODO: Redirect to /account/programs/[id]/points
  redirect("/account/programs/0/points");
}
