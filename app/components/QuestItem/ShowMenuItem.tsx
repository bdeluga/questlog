import { Quest, Village } from "@/db/schema";
import Modal from "@/ui/Modal";
import { faClone, faDiceD20, faFlask } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  quest: Quest;
}
export default function EditMenuItem({ quest }: Props) {
  return (
    <li>
      <Modal
        title={quest.title}
        asChild
        trigger={
          <button className="p-2 flex w-full gap-4 items-center justify-between rounded hover:bg-mauve3">
            Open <FontAwesomeIcon icon={faClone} />
          </button>
        }
      >
        <div className="mt-4">
          <fieldset className="space-y-4 w-full">
            <div className="flex gap-4">
              <div className="basis-7/12">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  readOnly
                  disabled
                  className={`w-full truncate peer p-2 rounded-md mt-1 bg-mauve4 `}
                  name="title"
                  value={quest.title}
                />
              </div>
              <div className="basis-5/12">
                <label htmlFor="difficulty">
                  Difficulty <FontAwesomeIcon icon={faDiceD20} />
                </label>
                <input
                  disabled
                  readOnly
                  id="difficulty"
                  className={`w-full p-2 rounded-md mt-1 bg-mauve4 `}
                  name="difficulty"
                  type="number"
                  value={quest.difficulty}
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                disabled
                readOnly
                id="description"
                className={`w-full resize-none min-h-[200px] p-2 rounded-md mt-1   ring-mauve5 bg-mauve4 `}
                name="description"
                value={quest.description}
              />
            </div>
            <div>
              <label htmlFor="description" className="text-mauve10">
                Equipment
              </label>
              <textarea
                disabled
                className={`w-full resize-none min-h-[100px] p-2 rounded-md mt-1  disabled:opacity-50 disabled:pointer-events-none bg-mauve4 `}
                value={"No equipment for this quest"}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label htmlFor="mercenary" className="text-mauve10">
                  Mercenary
                </label>
                <input
                  id="mercenary"
                  readOnly
                  disabled
                  className={`w-full p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none  bg-mauve4 `}
                  name="mercenary"
                  value={"No assignee"}
                />
              </div>
              <div>
                <label htmlFor="experience">
                  Experience <FontAwesomeIcon icon={faFlask} />
                </label>
                <input
                  id="experience"
                  readOnly
                  disabled
                  className={`w-full p-2 rounded-md mt-1   bg-mauve4 `}
                  name="mercenary"
                  value={quest.rewardExp}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </Modal>
    </li>
  );
}
