import * as CheckboxInput from "@radix-ui/react-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Checkbox(props: CheckboxInput.CheckboxProps) {
  return (
    <CheckboxInput.Root {...props}>
      <CheckboxInput.Indicator asChild>
        <FontAwesomeIcon icon={faCheck} className="text-xs" />
      </CheckboxInput.Indicator>
    </CheckboxInput.Root>
  );
}
