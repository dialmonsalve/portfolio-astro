import startUpload from "../../uploader-images/uploaderMultiImage";

import modal from "../components/modal";
import bodyModal from "../components/bodyImage";
import button from "../components/button";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";
import cleanTextInputs from "../utils/cleanTextInputs";
import addRequiredToInput from "../utils/addRequiredToInput";
import { AppRadioButtons, AppTextarea } from "../../web-components";
import type { Inputs } from "../interfaces";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $(".container-forms");

export function create({ incrementId }: { incrementId: number }) {
  const $parentDiv = doc.createElement("DIV");
  const $parentImages = doc.createElement("DIV");

  const buttonIdUpdate = `multi-image-update-${incrementId}`;
  const buttonIdRemove = `multi-image-remove-${incrementId}`;
  const containerId = `card-multi-image-${incrementId}`;

  const newLabel = "Edit Description";

  const id = `multi-image-${incrementId}`;
  const name = `multi-image-${incrementId}-${newLabel}`;

  const $containerImages = doc.createElement("div");
  const $label = doc.createElement("label");
  const $input = doc.createElement("input");
  const $span = doc.createElement("span");
  const $spanBody = doc.createElement("span");
  const $spanIcon = doc.createElement("i");

  $label.htmlFor = `${id}-${incrementId}`;
  $label.className = "text-capitalize label";
  $label.textContent = newLabel;

  $input.type = "file";
  $input.id = `${id}-${incrementId}`;
  $input.className = `uploader-${id}`;
  $input.setAttribute("name", id);
  $input.setAttribute("data-upload-route", "fake");
  $input.setAttribute("data-upload-key", "123456");
  $input.setAttribute("data-type", "image");
  $input.setAttribute("data-upload-id", "9585");
  $input.setAttribute("data-required", "false");

  $containerImages.classList.add("container-multi-images");
  $parentImages.style.width = "100%";

  $span.classList.add("add-photo");
  $span.id = `button-${id}`;
  $span.textContent = "+";
  $spanBody.className = "btn btn-danger";
  $spanBody.style.display = "none";
  $spanBody.setAttribute("data-target", `${id}-1`);

  $spanIcon.className = "bi bi-x";

  $containerImages.appendChild($label);
  $containerImages.appendChild($input);
  $containerImages.appendChild($span);
  $spanBody.appendChild($spanIcon);
  $containerImages.appendChild($spanBody);

  $containerImages.id = `contain-${id}`;

  setTimeout(() => {
    startUpload({
      containerId: id,
      name: id,
    });
  }, 100);

  const buttonUpdate = button(
    {
      id: `multi-image-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update photo options",
        content: () =>
          bodyModal(evt.target as HTMLButtonElement, {
            showPhoto: false,
          }),
        action: () => update(evt.target as HTMLButtonElement, { incrementId }),
      }),
  );

  const buttonDelete = button(
    {
      id: `multi-image-remove-${incrementId}`,
      text: "",
      spanClass: "button-square-remove",
      buttonClass: "inputs-btn-delete",
    },
    removeElementForm,
  );

  const $lastChildren = $containerCards?.lastElementChild;

  $parentDiv.classList.add("container-components");
  $parentDiv.classList.add("isDraggable");
  $parentDiv.id = containerId;

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentImages.appendChild($containerImages);
  $parentDiv.appendChild($parentImages);

  $lastChildren?.appendChild($parentDiv);

  const updateInputs: Inputs = {
    object: "MultiImage",
    id,
    name,
    label: newLabel,
    required: false,
    buttonIdUpdate,
    buttonIdRemove,
    containerId,
    disposition: "column",
  };

  storage.create($lastChildren, updateInputs);
}

export function update(
  target: HTMLButtonElement,
  { incrementId }: { incrementId: number },
) {
  const $radioButtonsRequired = $(
    "#container-radios-required",
  ) as AppRadioButtons;
  const $containerArea = $("#container-area-label") as AppTextarea;
  const $parentContainer = target.closest(".container-components");
  const $parentInputs = $parentContainer?.lastElementChild;

  const $label = $parentInputs?.querySelector("label");
  const $input = $parentInputs?.querySelector("input[type='file']");

  const labelText = cleanTextInputs($label);

  const newLabel = $containerArea.change ? $containerArea.value : labelText;

  const newCheckedRequired = $radioButtonsRequired.change
    ? $radioButtonsRequired.value
    : $input?.getAttribute("data-required") || "false";

  $label!.textContent = newLabel;

  addRequiredToInput({
    checkedRequired: newCheckedRequired as "false",
    elementRequired: $label!,
  });

  $input?.setAttribute("data-required", newCheckedRequired);

  const name = `single-image-${incrementId}-${newLabel}`;

  const rest = {
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true",
  };

  storage.update(target, rest);
}
