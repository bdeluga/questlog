"use client";
import { QuestTable } from "./Table";
import { Quest, Village } from "@/db/schema";
import { columns } from "./Table/columns";
import useSWR from "swr";

export default function Quests({ village }: { village: Village["name"] }) {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => data);

  const { data: quests, isLoading } = useSWR(
    `/api/quest?village=${village}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col p-4 h-full justify-start">
      <QuestTable data={quests} columns={columns} />
    </div>
  );
}
