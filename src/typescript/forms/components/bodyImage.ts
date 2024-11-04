import { REQUIRED_RADIOS } from "../const";
import cleanTextInputs from "../utils/cleanTextInputs";

const doc = document;

interface Options {
  showPhoto: boolean;
}

export default function bodyModal(
  target: HTMLButtonElement,
  { showPhoto }: Options,
) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons-form");
  const $containerArea = doc.createElement("app-textarea-form");

  $radioButtonsRequired.id = "container-radios-required";
  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsRequired.setAttribute("name", "inputs-required");

  $containerArea.setAttribute("label", "Label");
  $containerArea.setAttribute("input_id", "area");
  $containerArea.id = "container-area-label";

  const $parentContainer = target.closest(".container-components");

  const $parentInputs = $parentContainer?.lastElementChild;

  const $label = $parentInputs?.querySelector("label");
  const $input = $parentInputs?.querySelector("input[type='file']");

  const labelText = cleanTextInputs($label);

  const newCheckedRequired = $input?.getAttribute("data-required");

  if (!$parentInputs) return;

  const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedRequired,
  }));

  $containerArea.setAttribute("new_value", labelText);
  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios),
  );

  $parentDiv.appendChild($containerArea);
  if (!showPhoto) {
    $parentDiv.appendChild($radioButtonsRequired);
  }

  return $parentDiv;
}
