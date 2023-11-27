import "./globals.css";
import { Poppins } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
import NextAuthProvider from "~/app/context/AuthProvider";
import { auth } from "./auth";

export const metadata = {
  title: "Questlog",
  description:
    "Embark on a journey of achievement with Questlog. Manage your quests, track progress, and conquer your goals. Elevate your productivity and turn each task into a rewarding adventure!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-mauve1 flex flex-col  min-h-screen w-full text-mauve12`}
      >
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
