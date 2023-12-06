import * as CheckboxInput from "@radix-ui/react-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Checkbox(props: CheckboxInput.CheckboxProps) {
  return (
    <CheckboxInput.Root {...props}>
      <CheckboxInput.Indicator className="grid place-items-center">
        <FontAwesomeIcon icon={faCheck} />
      </CheckboxInput.Indicator>
    </CheckboxInput.Root>
  );
}
