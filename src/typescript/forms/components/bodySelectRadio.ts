import inputComponent from "./inputComponent";
import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";
import cleanTextInputs from "../utils/cleanTextInputs";

const doc = document;

interface Options {
  tagOptions: string;
  tag: string;
}

export default function bodyModal(
  target: HTMLButtonElement,
  { tag, tagOptions }: Options,
) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $parentContainer = target.closest(".container-components");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons");
  const $radioButtonsPosition = doc.createElement("app-radio-buttons");
  const $containerArea = doc.createElement("app-textarea");

  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsRequired.id = "container-radios-required";
  $radioButtonsRequired.setAttribute("name", "inputs-required");

  $radioButtonsPosition.setAttribute("name", "inputs-position");
  $radioButtonsPosition.setAttribute("label", "Position:");
  $radioButtonsPosition.id = "container-radios-position";

  const $ContainerInputLabel = inputComponent({
    name: "input-label",
    type: "text",
    label: "Label",
    id: "container-input-label",
  });

  const $parentInputs = $parentContainer?.lastElementChild;

  if (!$parentInputs) return;

  const $paragraph = $parentInputs.querySelector("p");
  const $input = $parentInputs.querySelector(tag);

  const paragraphText = cleanTextInputs($paragraph);

  $containerArea.setAttribute("name", "area");
  $containerArea.setAttribute("label", "options");
  $containerArea.setAttribute("input_id", "area");
  $containerArea.id = "container-area-label";

  const $options = $parentInputs.querySelectorAll(tagOptions);

  let newOptions = "";

  $options.forEach((node, index) => {
    newOptions += node.textContent;
    if (index < $options.length - 1) {
      newOptions += "\n";
    }
  });

  const newCheckedPosition = $parentInputs.getAttribute("disposition");
  const newCheckedRequired = $input?.getAttribute("data-required");

  const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedRequired,
  }));

  const updatedPositionRadios = POSITION_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedPosition,
  }));

  $ContainerInputLabel.setAttribute("new_value", paragraphText);
  $containerArea.setAttribute("new_value", newOptions);
  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios),
  );
  $radioButtonsPosition.setAttribute(
    "radios",
    JSON.stringify(updatedPositionRadios),
  );

  $parentDiv.appendChild($ContainerInputLabel);
  $parentDiv.appendChild($containerArea);
  $parentDiv.appendChild($radioButtonsRequired);
  $parentDiv.appendChild($radioButtonsPosition);

  return $parentDiv;
}
