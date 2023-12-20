import NoticeBoard from "@/app/components/NoticeBoard/NoticeBoard";
import NoticeBoardMenu from "@/app/components/NoticeBoard/NoticeBoardMenu";
import { db } from "@/db";

export default async function JournalPage({
  params,
}: {
  params: { village: string };
}) {
  const data = await db.query.villages.findFirst({
    where: (villages, { eq }) => eq(villages.name, decodeURI(params.village)),
    with: {
      quests: true,
    },
  });

  return (
    <div className="flex-1 flex flex-col">
      <NoticeBoardMenu village={data!} />
      <NoticeBoard
        headers={["new", "active", "resolved", "closed"]}
        data={data!}
      />
    </div>
  );
}
