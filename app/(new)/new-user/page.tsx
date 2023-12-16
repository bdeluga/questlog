import StepControl from "@/app/components/NewUserSteps/StepContol";

export default function NewUserPage() {
  return (
    <div className="min-h-screen flex flex-col font-bold justify-center items-center">
      <h1 className="text-5xl mb-4 text-center">
        Welcome to <span className="text-orange10">Questlog</span>
      </h1>
      <StepControl />
    </div>
  );
}
