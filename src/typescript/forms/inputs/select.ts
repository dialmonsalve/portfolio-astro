import modal from "../components/modal";
import button from "../components/button";
import bodyModal from "../components/bodySelectRadio";
import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";
import cleanTextInputs from "../utils/cleanTextInputs";
import addRequiredToInput from "../utils/addRequiredToInput";
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
  const $parentDiv = doc.createElement("div");
  const $parentInput = document.createElement("div");
  const $select = doc.createElement("select");
  const $paragraph = doc.createElement("p");

  const buttonIdUpdate = `select-update-${incrementId}`;
  const buttonIdRemove = `select-remove-${incrementId}`;
  const containerId = `card-select-${incrementId}`;

  const buttonUpdate = button(
    {
      id: buttonIdUpdate,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update select options",
        content: () =>
          bodyModal(evt.target as HTMLButtonElement, {
            tag: "select",
            tagOptions: "option",
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

  const $lastChildren = $containerCards?.lastElementChild;

  const newLabel = "Edit select";

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  $parentInput.classList.add(`container-control-row`);
  $parentInput.setAttribute("disposition", "row");

  $paragraph.classList.add("container-control__label");
  $paragraph.textContent = newLabel;

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);

  const id = `select-${incrementId}`;
  const name = `select-${incrementId}-${newLabel}`;

  $select.id = id;
  $select.classList.add("container-control__input-text");
  $select.setAttribute("name", name);
  $select.setAttribute("data-required", "false");

  const $option = doc.createElement("option");
  $option.value = "";
  $option.setAttribute("checked", "checked");

  $select.appendChild($option);

  $parentInput?.appendChild($paragraph);
  $parentInput.appendChild($select);

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
    object: "Select",
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
  const $select = $parentInputs?.querySelector("select");

  const $radioButtonsRequired = $(
    "#container-radios-required",
  ) as AppRadioButtons;
  const $radioButtonsPosition = $(
    "#container-radios-position",
  ) as AppRadioButtons;
  const $containerInputLabel = $("#container-input-label") as AppInput;
  const $containerArea = $("#container-area-label") as AppTextarea;

  const paragraphText = cleanTextInputs($paragraph);

  const $options = $parentInputs?.querySelectorAll("option");

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
    : $select?.getAttribute("data-required") || "false";

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

  $select?.setAttribute("data-required", newCheckedRequired);
  const allOptions = $parentInputs?.querySelectorAll("select option");

  allOptions?.forEach((option) => option.remove());

  const name = `select-${incrementId}-${newLabel}`;

  const options: Options[] = [];

  const optionsLabel: string[] = newOptions.split("\n");

  optionsLabel.forEach((elem, idx) => {
    const $option = doc.createElement("option");
    $option.setAttribute("name", `option-${incrementId}-${idx + 1}`);
    $option.id = `option-${incrementId}-${idx + 1}`;
    $option.value = elem;
    $option.textContent = elem;

    options.push({
      value: elem,
      valueToShow: elem,
      id: `option-${idx + 1}`,
    });

    $select?.appendChild($option);
  });

  const rest = {
    name,
    disposition: newCheckedPosition,
    label: newLabel,
    required: newCheckedRequired.trim() === "true",
    options,
  };

  storage.update(target, rest);
}
