import { auth } from "@/app/auth";
import NoticeBoard from "@/app/components/NoticeBoard/NoticeBoard";
import NoticeBoardMenu from "@/app/components/NoticeBoard/NoticeBoardMenu";
import { db } from "@/db";

export default async function JournalPage({
  params,
}: {
  params: { village: string };
}) {
  const user = await auth();

  const data = await db.query.villages.findFirst({
    where: (villages, { eq, and }) =>
      and(
        eq(villages.name, decodeURI(params.village)),
        eq(villages.userId, user!.user!.id)
      ),
    with: {
      quests: {
        where: (quests, { ne }) => ne(quests.state, "archived"),
      },
    },
  });

  return (
    <div className="flex-1 flex flex-col">
      <NoticeBoardMenu village={data!} />
      <NoticeBoard
        headers={["new", "active", "resolved", "closed"]}
        data={data as any}
      />
    </div>
  );
}
