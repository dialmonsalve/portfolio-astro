import modal from "../components/modal";
import removeElementForm from "../utils/removeElements";
import button from "../components/button";

import bodyModal from "../components/bodySelectRadio";
import storage from "../utils/saveAtLocalStorage";
import addRequiredToInput from "../utils/addRequiredToInput";
import cleanTextInputs from "../utils/cleanTextInputs";
import { AppInput, AppRadioButtons, AppTextarea } from "../../web-components";
import type { Inputs } from "../interfaces";

interface Options {
  value: string;
  id: string;
  valueToShow: string;
}

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export function create({ incrementId }: { incrementId: number }) {
  const $parentDiv = document.createElement("div");
  const $parentInput = document.createElement("div");
  const $paragraph = doc.createElement("p");

  const buttonIdUpdate = `radio-buttons-update-${incrementId}`;
  const buttonIdRemove = `radio-buttons-remove-${incrementId}`;
  const containerId = `card-radio-buttons-${incrementId}`;

  const buttonUpdate = button(
    {
      id: buttonIdUpdate,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update input options",
        content: () =>
          bodyModal(evt.target as HTMLButtonElement, {
            tag: "input",
            tagOptions: "label",
          }),
        action: () => update(evt.target as HTMLButtonElement, { incrementId }),
      }),
  );

  const buttonDelete = button(
    {
      id: buttonIdRemove,
      text: "",
      spanClass: "button-square-remove",
      buttonClass: "inputs-btn-delete",
    },
    removeElementForm,
  );

  const $label = doc.createElement("label");
  const $radio = doc.createElement("input");

  const newLabel = "Edit options";
  const id = `container-radio-${incrementId}`;
  const name = `radio-buttons-${incrementId}-${newLabel}`;
  const valueOpt = `radio-buttons-${incrementId}`;
  const nameOpt = "edit";
  $label.htmlFor = valueOpt;
  $label.textContent = nameOpt;
  $radio.type = "radio";
  $radio.id = valueOpt;
  $radio.setAttribute("data-required", "false");
  $radio.setAttribute("name", name);

  const $lastChildren = $containerCards?.lastElementChild;

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  $parentInput.classList.add(`container-control-row`);
  $parentInput.setAttribute("disposition", "row");

  $paragraph.classList.add("container-control__label");
  $paragraph.textContent = newLabel;

  $parentInput?.appendChild($paragraph);
  $parentInput.appendChild($radio);
  $parentInput?.appendChild($label);

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($parentInput);

  $lastChildren?.appendChild($parentDiv);

  const updateInputs: Inputs = {
    buttonIdRemove,
    buttonIdUpdate,
    containerId,
    disposition: "row",
    id,
    label: newLabel,
    name,
    object: "RadioButton",
    options: [],
    required: false,
  };

  storage.create($lastChildren, updateInputs);
}

export function update(
  target: HTMLButtonElement,
  { incrementId }: { incrementId: number },
) {
  const $parentContainer = target.closest(".container-components");
  const $parentInputs = $parentContainer?.lastElementChild;
  const $paragraph = $parentInputs?.querySelector("p");
  const $input = $parentInputs?.querySelector("input");

  const $radioButtonsRequired = $(
    "#container-radios-required",
  ) as AppRadioButtons;
  const $radioButtonsPosition = $(
    "#container-radios-position",
  ) as AppRadioButtons;
  const $containerInputLabel = $("#container-input-label") as AppInput;
  const $containerArea = $("#container-area-label") as AppTextarea;

  const paragraphText = cleanTextInputs($paragraph);

  const $options = $parentInputs?.querySelectorAll("label");

  let oldOptions = "";

  $options?.forEach((node, index) => {
    oldOptions += node.textContent;
    if (index < $options.length - 1) {
      oldOptions += "\n";
    }
  });

  const newLabel = $containerInputLabel.change
    ? $containerInputLabel.value
    : paragraphText || "";

  const newCheckedRequired = $radioButtonsRequired.change
    ? $radioButtonsRequired.value
    : $input?.getAttribute("data-required") || "false";

  const newCheckedPosition = $radioButtonsPosition.change
    ? $radioButtonsPosition.value
    : $parentInputs?.getAttribute("disposition") || "row";

  const newOptions = $containerArea.change ? $containerArea.value : oldOptions;

  if (newLabel === "" || newOptions === "") return;

  $paragraph!.textContent = newLabel;

  addRequiredToInput({
    checkedRequired: newCheckedRequired as "false",
    elementRequired: $paragraph!,
  });

  $parentInputs!.className = "";
  $parentInputs?.classList.add(`container-control-${newCheckedPosition}`);
  $parentInputs?.setAttribute("disposition", newCheckedPosition);

  const name = `radio-buttons-${incrementId}-${newLabel}`;
  const id = `container-radio-buttons-${incrementId}`;

  const options: Options[] = [];

  const optionsLabel: string[] = newOptions.split("\n");
  const allRadios = $parentInputs?.querySelectorAll('input[type="radio"]');
  const allLabels = $parentInputs?.querySelectorAll("label");
  allRadios?.forEach((radio) => radio.remove());
  allLabels?.forEach((label) => label.remove());

  optionsLabel.forEach((elem, idx) => {
    const $label = doc.createElement("label");
    const $radio = doc.createElement("input");
    const valueOpt = `radio-buttons-${incrementId}-${idx + 1}`;
    const nameOpt = elem;

    $label.htmlFor = valueOpt;
    $label.textContent = nameOpt;

    $radio.type = "radio";
    $radio.setAttribute("data-required", newCheckedRequired);
    $radio.setAttribute("name", name);
    $radio.id = valueOpt;

    options.push({ value: nameOpt, id: valueOpt, valueToShow: nameOpt });

    $parentInputs?.appendChild($radio);
    $parentInputs?.appendChild($label);
  });

  const rest = {
    id,
    disposition: newCheckedPosition,
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true",
    options,
  };
  storage.update(target, rest);
}
