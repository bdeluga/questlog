import StaggeredList from "@/app/components/StaggeredList";
export default function Home() {
  return (
    <main className="w-full relative p-12">
      <h1 className="text-6xl font-bold">
        Welcome to<span className="text-orange10"> Questlog</span>
      </h1>
      <p className="text-2xl font-bold text-mauve11 mt-2">
        Empower Your Team, Complete Quests!
      </p>
      <div className="flex mt-10 text-mauve max-w-xl">
        <StaggeredList />
      </div>
    </main>
  );
}
