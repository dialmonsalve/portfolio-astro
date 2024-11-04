import startUpload from "../../uploader-images/uploaderSingleImage";

import modal from "../components/modal";
import bodyModal from "../components/bodyImage";
import button from "../components/button";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";
import cleanTextInputs from "../utils/cleanTextInputs";
import addRequiredToInput from "../utils/addRequiredToInput";
import type { AppInput, AppRadioButtons } from "../../web-components";
import type { Inputs } from "../interfaces";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $(".container-forms");

interface OptionsCreate {
  incrementId: number;
  showPhoto: boolean;
  stringId: string;
  takePicture?: boolean;
}

export function create({
  incrementId,
  showPhoto,
  stringId,
  takePicture = false,
}: OptionsCreate) {
  const $parentDiv = doc.createElement("div");

  const isSingleImage = showPhoto ? "image" : "single-image";
  const isPicture = takePicture ? "photo" : isSingleImage;

  const buttonIdUpdate = `${isPicture}-update-${incrementId}`;
  const buttonIdRemove = `${isPicture}-remove-${incrementId}`;
  const containerId = `card-${isPicture}-${incrementId}`;

  const buttonUpdate = button(
    {
      id: buttonIdUpdate,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: `update ${stringId} options`,
        content: () =>
          bodyModal(evt.target as HTMLButtonElement, { showPhoto }),
        action: () =>
          update(evt.target as HTMLButtonElement, {
            incrementId,
            showPhoto,
          }),
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

  const newLabel = "Edit";

  const $containerImage = doc.createElement("div");
  const $imageDiv = doc.createElement("div");
  const $label = doc.createElement("label");
  const $input = doc.createElement("input");

  const id = `${stringId}-${incrementId}`;
  const name = `${stringId}-${incrementId}-${newLabel}`;

  $label.htmlFor = id;
  $label.setAttribute("name", name);
  $label.className = "label";
  $label.textContent = newLabel;

  $input.type = "file";

  if (takePicture) $input.setAttribute("capture", "environment");
  $input.className = `uploader-${id} hidden-image`;
  $input.id = id;

  $input.setAttribute("name", name);
  $input.setAttribute("accept", ".png, .jpeg, .jpg, .webp");
  $input.setAttribute("data-required", "false");

  setTimeout(() => {
    startUpload(id);
  }, 500);

  $containerImage.appendChild($label);
  $containerImage.appendChild($input);

  $containerImage.appendChild($imageDiv);

  $containerImage.classList.add("container-components__image");

  const $lastChildren = $containerCards?.lastElementChild;

  $parentDiv.classList.add("container-components");
  $parentDiv.classList.add("isDraggable");
  $parentDiv.id = containerId;

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv.appendChild($containerImage);
  $lastChildren?.appendChild($parentDiv);

  if (showPhoto) {
    const updateImage: Inputs = {
      object: "Image",
      id,
      label: newLabel,
      buttonIdUpdate,
      buttonIdRemove,
      containerId,
      disposition: "column",
    };
    $input.addEventListener("change", () => {
      const inputText = $parentDiv.querySelector(
        "input[type='text']",
      ) as HTMLInputElement;
      setTimeout(() => {
        const rest = {
          alt: `image-${newLabel}`,
          src: inputText.value,
        };
        storage.update(buttonUpdate, rest);
      }, 1000);
    });
    storage.create($lastChildren, updateImage);
  } else {
    const updateSingleImage: Inputs = {
      object: "SingleImage",
      id,
      name,
      label: newLabel,
      required: false,
      buttonIdUpdate,
      buttonIdRemove,
      containerId,
      placeholder: takePicture ? "environment" : null,
      disposition: "column",
    };
    storage.create($lastChildren, updateSingleImage);
  }
}

export function update(
  target: HTMLButtonElement,
  { incrementId, showPhoto }: { incrementId: number; showPhoto: boolean },
) {
  const $radioButtonsRequired = $(
    "#container-radios-required",
  ) as AppRadioButtons;
  const $containerArea = $("#container-area-label") as AppInput;

  const $parentContainer = target.closest(".container-components");
  const $parentInputs = $parentContainer?.lastElementChild;

  const $label = $parentInputs?.querySelector("label") as HTMLLabelElement;
  const $input = $parentInputs?.querySelector("input[type='file']");

  const isLabelChanged = $containerArea.change;
  const isRequiredChanged = $radioButtonsRequired?.change;

  const textLabel = cleanTextInputs($label);

  const newLabel = isLabelChanged ? $containerArea.value : textLabel;

  const newCheckedRequired = isRequiredChanged
    ? $radioButtonsRequired.value
    : $input?.getAttribute("data-required") || "false";

  $label.textContent = newLabel;

  addRequiredToInput({
    checkedRequired: newCheckedRequired as "false",
    elementRequired: $label,
  });

  $input?.setAttribute("data-required", newCheckedRequired);
  const name = `single-image-${incrementId}`;

  const updateSingleImage = {
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true",
  };

  const updateImage = {
    label: newLabel,
  };

  const updateInputs = showPhoto ? updateImage : updateSingleImage;

  storage.update(target, updateInputs);
}
