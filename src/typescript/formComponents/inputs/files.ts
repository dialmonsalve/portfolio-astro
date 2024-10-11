import modal from "../components/modal";
import button from "../components/button";
import inputComponent from "../components/inputComponent";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";

import { MULTIPLE_RADIOS, REQUIRED_RADIOS } from "../const";

const checkboxFormats = [
  "doc",
  "xls",
  "ppt",
  "pdf",
  "docx",
  "xlsx",
  "pptx",
  "mp4",
  "avi",
  "mov",
  "mkv",
  "mp3",
  "wav",
  "ogg",
  "aac",
  "txt",
  "csv",
  "zip",
  "rar",
  "7z",
  "odt",
  "ods",
  "odp",
  "rtf",
];

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $(".container-forms");

const elementsCheck = (elementChecked = "") => {
  const $parentCheckbox = doc.createElement("DIV");
  $parentCheckbox.classList.add("container-modal-checkbox");

  checkboxFormats.map((check) => {
    const $containerCheck = document.createElement("DIV");

    $containerCheck.className = "form-check form-switch";

    const isChecked = elementChecked?.split(",").includes(`.${check}`)
      ? "checked"
      : "";

    const $paragraph = document.createElement("P");
    const $input = document.createElement("INPUT");

    $input.className = "form-check-input accept";
    $input.type = "checkbox";
    $input.checked = isChecked;
    $input.id = check;
    $input.value = `.${check}`;
    $input.setAttribute("name", check);

    $paragraph.textContent = check;

    $containerCheck.appendChild($input);
    $containerCheck.appendChild($paragraph);
    $parentCheckbox.appendChild($containerCheck);
  });

  return $parentCheckbox;
};

export default function files() {
  const $files = $("#files");
  let incrementId = 0;

  $files.addEventListener("click", () => {
    incrementId++;
    create(incrementId);
  });
}

function configure(target, incrementId) {
  modal({
    title: "configure files",
    content: () => bodyModal(target),
    action: () => update(target, incrementId),
  });
}

function bodyModal(target) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons");
  const $radioButtonsMultiple = doc.createElement("app-radio-buttons");

  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsRequired.setAttribute("name", "inputs-required");
  $radioButtonsRequired.id = "container-radios-required";

  $radioButtonsMultiple.setAttribute("label", "Multiple:");
  $radioButtonsMultiple.setAttribute("name", "inputs-multiple");
  $radioButtonsMultiple.id = "container-radios-multiple";

  const $ContainerInputLabel = inputComponent({
    name: "input-label",
    type: "text",
    label: "Label",
    id: `container-input-label`,
  });

  const $parentInputs = target.closest(".container-components");

  const $label = $parentInputs.querySelector("P");
  const $input = $parentInputs.querySelector("input");
  // $input.getAttribute("accept");

  const newLabel = $label.textContent;
  const newCheckedMultiple = $input.getAttribute("multiple");

  const newCheckedRequired = $input.getAttribute("data-required");

  if (!$parentInputs) return;

  const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedRequired,
  }));

  const updatedPositionRadios = MULTIPLE_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedMultiple,
  }));

  $ContainerInputLabel.setAttribute("new_value", newLabel);

  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios)
  );
  $radioButtonsMultiple.setAttribute(
    "radios",
    JSON.stringify(updatedPositionRadios)
  );

  const accept = $input.getAttribute("accept");

  $parentDiv.appendChild($ContainerInputLabel);
  $parentDiv.appendChild(elementsCheck(accept));
  $parentDiv.appendChild($radioButtonsRequired);
  $parentDiv.appendChild($radioButtonsMultiple);

  return $parentDiv;
}

function create(incrementId) {
  const $parentDiv = document.createElement("DIV");
  const $parentImage = document.createElement("DIV");
  const $paragraph = document.createElement("P");
  const $containerVoucher = document.createElement("DIV");
  const $label = document.createElement("LABEL");
  const $labelImage = document.createElement("LABEL");
  const $image = doc.createElement("IMG");
  const $input = doc.createElement("INPUT");
  const $containerNameFiles = document.createElement("DIV");
  const $lastChildren = $containerCards?.lastElementChild;

  const label = $paragraph.textContent || "";
  const id = `files-${incrementId}`;
  const name = `files-${incrementId}-${label}`;

  $parentDiv.classList.add("container-components");
  $parentDiv.id = `card-text-${incrementId}`;

  $parentImage.classList.add("container-components__image");
  $parentImage.id = id;

  $paragraph.className = "text-capitalize text-voucher";
  $paragraph.id = `label-${incrementId}`;

  $label.classList.add("voucher-upload");
  $label.htmlFor = id;
  $label.id = "input-files";
  $label.textContent = "upload images";

  $labelImage.classList.add("voucher");
  $labelImage.htmlFor = id;

  $image.classList.add("voucher-img");
  $image.src = "/icons/upload.svg";
  $image.alt = "voucher upload";

  $input.classList.add("voucher-input");
  $input.type = "file";
  $input.id = id;
  $input.setAttribute("name", name);
  $input.setAttribute("data-required", "false");
  $input.setAttribute("multiple", "false");

  $containerVoucher.classList.add("container-voucher");

  $containerNameFiles.id = `name-${id}`;
  $containerNameFiles.classList.add("container-name-files");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt.target, incrementId)
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

  $labelImage.appendChild($image);

  $containerVoucher.appendChild($label);
  $containerVoucher.appendChild($labelImage);
  $containerVoucher.appendChild($input);

  $parentImage.appendChild($paragraph);
  $parentImage.appendChild($containerVoucher);
  $parentImage.appendChild($containerNameFiles);

  $parentDiv.appendChild(buttonUpdate);
  $parentDiv.appendChild(buttonDelete);

  $parentDiv.appendChild($parentImage);

  $lastChildren.appendChild($parentDiv);

  const updateInputs = {
    object: "Files",
    id,
    name,
    label: label === "" ? null : label,
    multiple: null,
    accept: null,
    required: false,
  };

  storage.create(updateInputs, $lastChildren);
}

function update(target, incrementId) {
  const $parentDiv = $("app-modal-body");
  const $checkboxChecked = $parentDiv.querySelectorAll(
    '.container-modal-checkbox input[type="checkbox"]:checked'
  );
  const $containerInputLabel = $("#container-input-label");
  const $radioButtonsRequired = $("#container-radios-required");
  const $radioButtonsMultiple = $("#container-radios-multiple");

  const $parentElement = target.closest(".container-components");

  const isRequiredChanged = $radioButtonsRequired._change;
  const isMultipleChanged = $radioButtonsMultiple._change;

  let accept = "";

  for (const checkbox of $checkboxChecked) {
    accept = accept.concat(checkbox.value, ",");
  }

  const $input = $parentElement.querySelector("INPUT");
  const $paragraph = $parentElement.querySelector("P");

  const newLabel = $containerInputLabel._change
    ? $containerInputLabel.value
    : $paragraph.textContent || "";

  const newCheckedRequired = isRequiredChanged
    ? $radioButtonsRequired.value
    : $input.getAttribute("data-required");

  const newCheckedMultiple = isMultipleChanged
    ? $radioButtonsMultiple.value
    : $input.getAttribute("multiple");

  $paragraph.textContent = newLabel;
  $input.setAttribute("accept", accept);
  $input.setAttribute("data-required", newCheckedRequired);
  $input.setAttribute("multiple", newCheckedMultiple);

  const name = `files-${incrementId}-${newLabel}`;

  const rest = {
    multiple: newCheckedMultiple,
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true" ? true : false,
    accept,
  };

  storage.update($parentElement, $input, rest);
}