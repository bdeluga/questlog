import { auth } from "@/auth";
import SearchInput from "@/components/SearchInput";
import { db } from "@/db";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Realms({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();

  const searchQuery = searchParams["q"] as string;

  if (!session) return null;

  const userRealms = await db.query.villages.findMany({
    where: (village, { eq, and, like }) =>
      and(
        eq(village.userId, session.user?.id!),
        searchQuery ? like(village.name, `%${searchQuery}%`) : undefined
      ),
  });

  return (
    <div className="max-w-6xl w-full mx-auto">
      <SearchInput />
      {userRealms.length ? (
        <div className="flex">
          {userRealms.map((realm) => (
            <div className="p-4 border">
              {realm.name} ({realm.level})
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-60 justify-center items-center flex-col gap-4">
          {
            <div className="flex flex-col gap-2 items-center">
              <p>No Realms Found</p>
              <p className="text-mauve11 text-sm">
                {searchQuery
                  ? `Your search "${searchQuery}" did not find any realms.`
                  : "Looks like your account does not have any realms to travel to."}
              </p>
            </div>
          }
          <button
            type="button"
            className="hover:underline text-blue9 underline-offset-2 text-sm"
          >
            New Realm <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
}

{
  /* <div
  class="spinner_wrapper__zbFtL"
  data-geist-spinner=""
  data-version="v1"
  style="--spinner-size: 20px;"
>
  <div class="spinner_spinner__fqUfx">
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
    <div class="spinner_bar__VysK5"></div>
  </div>
</div>; */
}
