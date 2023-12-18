"use client";
import { useState } from "react";
import Step from "../Step";
import Plan from "./Plan";
import Village from "./Village";
import { User, Village as VillageSchema } from "@/db/schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import updateUserDetailsAction from "@/app/actions/addPlanAction";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { HashLoader } from "react-spinners";
interface NewUserFormData {
  plan: User["plan"];
  villageName: VillageSchema["name"];
}

export default function StepControl() {
  let [step, setStep] = useState(1);
  const [formData, setFormData] = useState<NewUserFormData>({
    plan: null,
    villageName: "",
  });
  const router = useRouter();
  const toast = useToast();

  const clientAction = async () => {
    await updateUserDetailsAction(formData.plan, formData.villageName)
      .then(() => {
        toast.notify({
          title: "Success",
          description: "Account details successfully updated",
        });
        router.push(formData.villageName);
      })
      .catch((err) => {
        toast.notify({
          title: "Error",
          description:
            "There was an error updating your plan, log in and try again",
        });
      });
  };

  const handleUpdatePlan = (plan: NewUserFormData["plan"]) => {
    setFormData((prev) => ({
      ...prev,
      plan,
    }));
  };
  const handleUpdateVillage = (villageName: NewUserFormData["villageName"]) => {
    setFormData((prev) => ({
      ...prev,
      villageName,
    }));
  };

  const StepMap = {
    1: <Plan updateForm={handleUpdatePlan} value={formData.plan} />,
    2: (
      <Village updateForm={handleUpdateVillage} value={formData.villageName} />
    ),
    3: <HashLoader color="#ff801f" />,
  };

  return (
    <div className="w-full max-w-md">
      {step < 3 && (
        <div className="flex justify-between rounded p-8">
          <div className="flex flex-col items-center gap-2">
            <Step step={1} currentStep={step} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Step step={2} currentStep={step} />
          </div>
        </div>
      )}
      <form
        action={clientAction}
        className={` ${step > 2 && "flex justify-center items-center"}`}
      >
        {StepMap[step as keyof typeof StepMap]}

        <div className={`px-8 pb-8  ${step > 2 && "hidden"}`}>
          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(step < 2 ? step : step - 1)}
              className={`${
                step === 1 ? "pointer-events-none opacity-50" : ""
              } duration-350 border border-mauve12 rounded px-4 py-1 text-neutral-400 transition hover:bg-mauve12 hover:text-mauve1`}
            >
              Back
            </button>
            <button
              disabled={step == 2 && !formData.villageName}
              type={step < 1 ? "button" : "submit"}
              onClick={() => setStep(step > 2 ? step : step + 1)}
              className={`duration-350 border group border-mauve12 rounded disabled:opacity-50 disabled:pointer-events-none px-4 py-1 text-neutral-400 transition hover:bg-mauve12 hover:text-mauve1`}
            >
              {step === 2 ? "Submit" : "Continue"}{" "}
              <FontAwesomeIcon
                className="group-hover:translate-x-1 duration-150 transition-transform"
                icon={faChevronRight}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
