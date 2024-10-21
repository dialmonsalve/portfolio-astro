import { $, element } from "../utils/utilities";

import type Button from "../components/Button";
import type { Storage } from "../interface/storage";
import type { AppInput, AppRadioButtons } from "../webComponents";
import type { IptComponent } from "../components/inputComponent";

interface OptionsCreate {
  incrementId: number
  object: "Text" | "Email" | "Phone" | "Password";
  type: TypeInput
}
interface OptionsUpdate {
  target: HTMLButtonElement;
  incrementId: number;
  type?: TypeInput
}

interface UpdateButton {
  isPassword: string;
  incrementId: number;
  type?: TypeInput
}

interface Modal {
  title: string;
  type?: keyof typeof Color;
  content?: () => HTMLElement | undefined;
  action?: (e: MouseEvent) => void;
}

interface RequiredRadios {
  name: "text-required";
  value: "true" | "false";
  labelText: "Yes" | "No";
  id: "yes" | "no";
}



interface PositionRadios {
  name: "text-position",
  value: "row" | "column",
  labelText: "row" | 'column',
  id: "row",
}


export const MULTIPLE_RADIOS = [
  {
    value: "true",
    labelText: "Yes",
    id: "yes",
  },
  {
    value: "false",
    labelText: "No",
    id: "no",
  }
];

const Color = {
  yellow: "yellow",
  green: "green",
  purple: "purple",
  red: "red",
} as const;

type TypeInput = "text" | "email" | "phone" | "password" | "date" | "date-time" | "number"

const $containerCards = $(".container-forms");
const { create } = element

export default class Input {

  private button: typeof Button;
  private  $inputComponent: typeof IptComponent;
  private removeElementForm: (evt: MouseEvent) => void;
  private storage: Storage;
  private modal: (opts: Modal) => void;
  private REQUIRED_RADIOS: RequiredRadios[];
  private POSITION_RADIOS: PositionRadios[];

  constructor(
    button: typeof Button,
    $inputComponent: typeof IptComponent,
    storage: Storage,
    removeElementForm: (evt: MouseEvent) => void,
    modal: (opts: Modal) => void,
    REQUIRED_RADIOS: RequiredRadios[],
    POSITION_RADIOS: PositionRadios[]
  ) {

    this.button = button;
    this.removeElementForm = removeElementForm;
    this.storage = storage
    this.modal = modal
    this.REQUIRED_RADIOS = REQUIRED_RADIOS;
    this.POSITION_RADIOS = POSITION_RADIOS;
    this.$inputComponent = $inputComponent
  }

  updateButton = ({ isPassword, incrementId, type }: UpdateButton) => {
    const buttonId = `${isPassword}-update-${incrementId}`;
    const text = "";
    const spanClass = "button-square-update";
    const buttonClass = "inputs-btn-update";
    const newButton = new this.button({ text, spanClass, buttonClass, buttonId })
    newButton.action(evt => this.modal({
      title: `update input ${type}`,
      content: () => this.bodyModal(evt.target as HTMLButtonElement, { type }),
      action: () => this.update({ target: evt.target as HTMLButtonElement, incrementId, type }),
    }))
    return newButton.create
  }

  deleteButton = ({ isPassword, incrementId }: UpdateButton) => {
    const buttonId = `${isPassword}-remove-${incrementId}`;
    const text = "";
    const spanClass = "button-square-remove";
    const buttonClass = "inputs-btn-delete";

    const newButton = new this.button({ text, spanClass, buttonClass, buttonId })
    newButton.action(this.removeElementForm)
    return newButton.create
  }

  create = ({ incrementId, object, type }: OptionsCreate) => {

    const $parentDiv = create("div");
    const $parentInput = create("div");
    const isPassword = object === "Password" ? "password" : type;
    const containerId = `card-${isPassword}-${incrementId}`;
    const buttonIdRemove = `${isPassword}-remove-${incrementId}`;
    const buttonIdUpdate = `${isPassword}-update-${incrementId}`;

    const buttonUpdate = this.updateButton({ incrementId, isPassword, type })
    const buttonDelete = this.deleteButton({ incrementId, isPassword });

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    const newLabel = "edit text";

    $parentDiv.className = "container-components isDraggable";
    $parentDiv.id = containerId;

    $parentInput.classList.add(`container-control-row`);
    $parentInput.setAttribute("disposition", "row");

    const $label = create("label");
    const $input = create("input");

    const id = `${isPassword}-${incrementId}`;
    const name = `${isPassword}-${incrementId}-${newLabel}`;

    $label.classList.add("container-control__label");
    $label.htmlFor = id;
    $label.textContent = newLabel;

    $input.type = isPassword;
    $input.setAttribute("name", name);
    $input.id = id;
    $input.classList.add("container-control__input-text");
    $input.setAttribute("autocomplete", "on");
    $input.setAttribute("data-required", "false");

    $parentInput.appendChild($label);
    $parentInput.appendChild($input);

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);
    $parentDiv?.appendChild($parentInput);
    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
      buttonIdRemove,
      buttonIdUpdate,
      containerId,
      disposition: "row" as "row",
      id,
      label: newLabel,
      name,
      object,
      placeholder: null,
      required: false,
    };

    this.storage.create($lastChildren, updateInputs);
  }

  update = ({ target, incrementId, type }: OptionsUpdate) => {
    const $parentContainer = target.closest(".container-components");
    const $parentInputs = $parentContainer?.lastElementChild as HTMLDivElement;
    const $label = $parentInputs.querySelector("label") as HTMLLabelElement;
    const $input = $parentInputs.querySelector("input") as HTMLInputElement;

    let labelText = "";

    $label.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        labelText += node.textContent;
      }
    });

    const oldLabel = labelText;

    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
    const $ContainerInputLabel = $("#container-input-label") as AppInput;
    const $ContainerInputPlaceholder = $("#container-input-placeholder") as AppInput;

    const isPlaceholderChanged = $ContainerInputPlaceholder.change;
    const isRequiredChanged = $radioButtonsRequired.change;
    const isDispositionChanged = $radioButtonsPosition.change;

    const newLabel = $ContainerInputLabel.change
      ? $ContainerInputLabel.value
      : oldLabel;

    const newPlaceholder = isPlaceholderChanged
      ? $ContainerInputPlaceholder.value
      : $input.getAttribute("placeholder") || "";

    const newCheckedRequired = isRequiredChanged
      ? $radioButtonsRequired.value
      : $input.getAttribute("data-required") || 'false';

    const newCheckedPosition = isDispositionChanged
      ? $radioButtonsPosition.value
      : $parentInputs.getAttribute("disposition") || 'row';

    if (newLabel === "") return;

    $parentInputs.className = "";
    $parentInputs.classList.add(`container-control-${newCheckedPosition}`);
    $parentInputs.setAttribute("disposition", newCheckedPosition);

    $label.textContent = newLabel;
    const name = `${type}-${incrementId}-${newLabel}`;
    $input.setAttribute("placeholder", newPlaceholder);
    $input.setAttribute("data-required", newCheckedRequired);
    $input.setAttribute("name", name);

    const rest = {
      disposition: newCheckedPosition,
      name,
      label: `'${newLabel}'`,
      placeholder:
        newPlaceholder.trim() !== "" ? `'${newPlaceholder}'` : null,
      required: newCheckedRequired.trim() === "true" ? true : false,
    };

    this.storage.update(target, rest);
  }

  bodyModal = (target: HTMLButtonElement, { type }: { type?: TypeInput }) => {
    const $parentDiv = document.createElement("app-modal-body");
    const $radioButtonsRequired = document.createElement("app-radio-buttons");
    const $radioButtonsPosition = document.createElement("app-radio-buttons");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsPosition.setAttribute("name", "inputs-position");
    $radioButtonsRequired.id = "container-radios-required";

    $radioButtonsPosition.setAttribute("label", "Position:");
    $radioButtonsRequired.setAttribute("name", "inputs-required");
    $radioButtonsPosition.id = "container-radios-position";

    const $ContainerInputLabel = new this.$inputComponent({
      name: "input-label",
      type,
      label: "Label",
      id: `container-input-label`,
    });

    const $ContainerInputPlaceholder = new this.$inputComponent({
      name: "input-placeholder",
      type,
      label: "Placeholder",
      id: "container-input-placeholder",
    });

    const $parentContainer = target.closest(".container-components");

    const $parentInputs = $parentContainer?.lastElementChild as HTMLDivElement;

    if (!$parentInputs) return;

    const $label = $parentInputs.querySelector("label");
    const $input = $parentInputs.querySelector("input");

    let labelText = "";

    $label?.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        labelText += node.textContent;
      }
    });

    const newLabel = labelText;
    const newCheckedPosition = $parentInputs.getAttribute("disposition");

    const newPlaceholder = $input?.getAttribute("placeholder") || "";
    const newCheckedRequired = $input?.getAttribute("data-required");

    const updatedRequiredRadios = this.REQUIRED_RADIOS.map((radio) => ({
      ...radio,
      isChecked: radio.value === newCheckedRequired,
    }));

    const updatedPositionRadios = this.POSITION_RADIOS.map((radio) => ({
      ...radio,
      isChecked: radio.value === newCheckedPosition,
    }));

    $ContainerInputLabel.create.setAttribute("new_value", newLabel);
    $ContainerInputPlaceholder.create.setAttribute("new_value", newPlaceholder);
    $radioButtonsRequired.setAttribute(
      "radios",
      JSON.stringify(updatedRequiredRadios)
    );
    $radioButtonsPosition.setAttribute(
      "radios",
      JSON.stringify(updatedPositionRadios)
    );

    $parentDiv.appendChild($ContainerInputLabel.create);
    $parentDiv.appendChild($ContainerInputPlaceholder.create);
    $parentDiv.appendChild($radioButtonsRequired);
    $parentDiv.appendChild($radioButtonsPosition);

    return $parentDiv;
  }
}


