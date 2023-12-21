"use client";
import { Table } from "./Table";
import { Quest, Village } from "@/db/schema";
import { columns } from "./Table/columns";
import useSWR from "swr";
import Loading from "./Table/loading";

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

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col p-4 h-full justify-start">
      <Table data={quests} columns={columns} />
    </div>
  );
}
