import startUpload from "../components/uploaderMultiImage"

import modal from "../components/modal";
import bodyModal from "../components/bodyImage";
import button from "../components/button";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $(".container-forms");

export default function singleImage() {
  const $multiImage = $("#multi-image");

  let incrementId = 0;

  $multiImage?.addEventListener("click", () => {
    incrementId++;
    create(incrementId);
  });
}

function configure(evt, $parentDiv, incrementId) {
  modal({
    title: "update select options",
    content: () =>
      bodyModal(evt.target, {
        isCreate: false,
      }),
    action: () => update($parentDiv, incrementId),
  });
}

function create(incrementId) {
  const $parentDiv = doc.createElement("DIV");
  const $parentImages = doc.createElement("DIV");

  const newLabel = "Edit Description";

  const id = `multi-image-${incrementId}`;
  const name = `multi-image-${incrementId}-${newLabel}`;

  const $containerImages = doc.createElement("DIV");
  const $label = doc.createElement("LABEL");
  const $input = doc.createElement("INPUT");
  const $span = doc.createElement("SPAN");
  const $spanBody = doc.createElement("SPAN");
  const $spanIcon = doc.createElement("I");

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
      userId: "userId",
      token: "token",
      route: "route",
      containerId: id,
      name: id,
    });
    $parentImages.id = id;
  }, 100);

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt, $parentDiv, incrementId)
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

  const $lastChildren = $containerCards?.lastElementChild;

  $parentDiv.classList.add("container-components");

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentImages.appendChild($containerImages);
  $parentDiv.appendChild($parentImages);

  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object: "MultiImage",
    id,
    name,
    label: newLabel,
    required: false,
  };

  storage.create(updateInputs, $lastChildren);
}

function update(parentElement, incrementId) {
  const $radioButtonsRequired = $("#container-radios-required");
  const $containerArea = $("#container-area-label");
  const $label = parentElement.querySelector("LABEL");
  const $input = parentElement.querySelector("input");
  const $parentDiv = parentElement.querySelector("div");

  const isLabelChanged = $containerArea._change;
  const isRequiredChanged = $radioButtonsRequired._change;

  const newLabel = isLabelChanged ? $containerArea.value : $label.textContent;

  const newCheckedRequired = isRequiredChanged
    ? $radioButtonsRequired.value
    : $input.getAttribute("data-required");

  $label.textContent = newLabel;
  $input.setAttribute("data-required", newCheckedRequired);

  const name = `single-image-${incrementId}-${newLabel}`;

  const rest = {
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true" ? true : false,
  };

  storage.update(parentElement, $parentDiv, rest);
}