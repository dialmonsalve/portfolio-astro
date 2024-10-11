import startUpload from "../components/uploaderSingleImage";

import modal from "../components/modal";
import bodyModal from "./bodyImage";
import button from "./button";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";
import type { AppRadioButtons, AppTextareaForm } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $(".container-forms");

function configure(target: HTMLButtonElement, $parentDiv: HTMLDivElement, incrementId: number) {
  modal({
    title: "update image options",
    content: () => bodyModal(target),
    action: () => update($parentDiv, incrementId),
  });
}

interface Create {
  showPhoto: boolean;
  userId: string;
  userToken: string;
  route: string;
  stringId: string;
  object:'SingleImage' | 'Image'
}

export function create(
  incrementId: number,
  { showPhoto, userId, userToken, route, object, stringId }: Create
) {
  const $parentDiv = doc.createElement("DIV")as HTMLDivElement;

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt.target as HTMLButtonElement, $parentDiv, incrementId)
  );

  const buttonDelete = button(
    {
      id: `heading-remove-${incrementId}`,
      text: "",
      spanClass: "button-square-remove",
      buttonClass: "inputs-btn-delete",
    },
    removeElementForm
  );

  const newLabel = "Edit";

  const $containerImage = doc.createElement("DIV");
  const $imageDiv = doc.createElement("DIV");
  const $label = doc.createElement("LABEL") as HTMLLabelElement;
  const $input = doc.createElement("INPUT") as HTMLInputElement;

  const id = `${stringId}-${incrementId}`;
  const name = `${stringId}-${incrementId}-${newLabel}`;

  $label.htmlFor = `${id}-${incrementId}`;
  $label.setAttribute("name", name);
  $label.className = "text-capitalize label";
  $label.textContent = newLabel;

  $input.type = "file";
  $input.className = `uploader-${id} hidden-image`;
  $input.id = `${id}-${incrementId}`;

  const upload = showPhoto
    ? { route, userToken, userId }
    : { route: "fake", userToken: "567", userId: id };

  $input.setAttribute("name", name);
  $input.setAttribute("data-upload-route", upload.route);
  $input.setAttribute("data-upload-key", upload.userToken);
  $input.setAttribute("data-upload-id", upload.userId);
  $input.setAttribute("accept", ".png, .jpeg, .jpg, .webp");
  $input.setAttribute("data-required", "false");

  setTimeout(() => {
    startUpload(id);
    $containerImage.id = id;
  }, 1000);

  $containerImage.appendChild($label);
  $containerImage.appendChild($input);

  $containerImage.appendChild($imageDiv);

  $containerImage.id = id;
  $containerImage.classList.add("container-components__image");

  const $lastChildren = $containerCards?.lastElementChild;

  $parentDiv.classList.add("container-components");

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv.appendChild($containerImage);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object,
    id,
    name,
    label: newLabel,
    required: false,
  };

  storage.create(updateInputs, $lastChildren);
}

function update(parentElement: HTMLDivElement, incrementId: number) {
  const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
  const $containerArea = $("#container-area-label") as AppTextareaForm;
  const $label = parentElement.querySelector("LABEL") as HTMLLabelElement;
  const $input = parentElement.querySelector("input");

  const isLabelChanged = $containerArea?.change;
  const isRequiredChanged = $radioButtonsRequired.change;

  const newLabel = isLabelChanged ? $containerArea.value : $label?.textContent;

  const newCheckedRequired = isRequiredChanged
    ? $radioButtonsRequired.value
    : $input?.getAttribute("data-required") || '';

  $label.textContent = newLabel;
  $input?.setAttribute("data-required", newCheckedRequired);

  const name = `single-image-${incrementId}-${newLabel}`;

  const rest = {
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true" ? true : false,
  };

  storage.update(parentElement, $label.parentElement, rest)

}