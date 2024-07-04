import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";

export default function RegflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-between p-4 items-center border-b border-mauve3">
        <Link href={"/"} className="text-2xl">
          <FontAwesomeIcon icon={faBookBookmark} className="text-orange11" />
          <span className="ml-1">Questlog</span>
        </Link>
        <AuthButtons />
      </header>
      {children}
    </>
  );
}
