import button from "../components/button";
import inputComponent from "../components/inputComponent";
import modal from "../components/modal";
import { PAGES_STRING, POSITION_RADIOS, REQUIRED_RADIOS } from "../const";
import type { Page } from "../interface";
import saveAtLocalStorage from "../utils/saveAtLocalStorage";
import type { AppInput, AppRadioButtons } from "../webComponents";

const $ = (selector: string) => document.querySelector(selector)
const $containerCards = $(".container-forms");

const UnifiedInputs = {
  "text": { key: "text", value: "Text" },
  "number": { key: "number", value: "Number" },
  "email": { key: "email", value: "Email" },
  "date": { key: "date", value: "Date" },
  "time": { key: "time", value: "DateTime" },
  "password": { key: "password", value: "Password" },
  "phone": { key: "phone", value: "Phone" }
} as const;

type ObjKeys = keyof typeof UnifiedInputs;
type ObjValues = typeof UnifiedInputs[ObjKeys]["value"];

interface Props {
  target: HTMLInputElement
  type: ObjKeys;
  incrementId: number;
}
export default class Input {

  private type: ObjKeys
  private target: HTMLInputElement;
  private incrementId: number;

  constructor({ type, incrementId, target }: Props,) {
    this.type = type
    this.incrementId = incrementId
    this.target = target;
  }

  create = (object: ObjValues) => {

    const $ContainerInputLabel = $("#container-input-label") as AppInput;
    const $ContainerInputPlaceholder = $("#container-input-placeholder") as AppInput;
    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
    const $parentDiv = document.createElement("DIV");

    const buttonUpdate = button({
      id: `heading-update-${this.incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    }, (evt) => this.showPopUp(evt, this.incrementId, this.type,))

    const buttonDelete = button({
      id: `heading-remove-${this.incrementId}`,
      text: "",
      spanClass: "button-square-remove",
      buttonClass: "inputs-btn-delete",
    }, this.remove);

    const $lastChildren = $containerCards?.lastElementChild;

    const newLabel = $ContainerInputLabel.value;
    const newPlaceholder = $ContainerInputPlaceholder.value;

    const newCheckedRequired =
      $radioButtonsRequired.value === ""
        ? "false"
        : $radioButtonsRequired.value;

    const newCheckedPosition =
      $radioButtonsPosition.value === ""
        ? "row"
        : $radioButtonsPosition.value;

    if (newLabel.trim() === "") return;

    $parentDiv.classList.add("container-components");
    $parentDiv.classList.add(`container-control-${newCheckedPosition}`);
    $parentDiv.id = `card-input-${this.incrementId}`;

    const $label = document.createElement("LABEL") as HTMLLabelElement;
    const $input = document.createElement("INPUT") as HTMLInputElement;

    const id = `${this.type}-${this.incrementId}`;
    const name = `${this.type}-${this.incrementId}-${newLabel}`;

    $label.classList.add("container-control__label");
    $label.htmlFor = id;
    $label.textContent = newLabel;
    $label.setAttribute("disposition", newCheckedPosition);

    $input.type = this.type;
    $input.setAttribute("name", name);
    $input.id = id;
    $input.classList.add("container-control__input-text");
    $input.setAttribute("autocomplete", "on");
    $input.setAttribute("placeholder", newPlaceholder);
    $input.setAttribute("data-required", newCheckedRequired);

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);
    $parentDiv?.appendChild($label);
    $parentDiv?.appendChild($input);
    $lastChildren?.appendChild($parentDiv);

    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

    const updateInputs = {
      object,
      id,
      name,
      label: newLabel,
      disposition: newCheckedPosition,
      placeholder: newPlaceholder.trim() !== "" ? newPlaceholder : null,
      required: newCheckedRequired === "true" ? true : false,
    };

    const updatedPages = pages.map((page) => {
      if (page.id === $lastChildren?.getAttribute("id")) {
        return {
          ...page,
          inputs: [...page.inputs, updateInputs],
        };
      }
      return page;
    });

    saveAtLocalStorage(updatedPages);

  }

  update = () => {
    const parentElement = this.target.closest(".container-components") as HTMLDivElement;
    const $label = parentElement?.querySelector("label") as HTMLLabelElement;
    const $input = parentElement?.querySelector("input") as HTMLInputElement;

    const $ContainerInputLabel = $("#container-input-label") as AppInput;
    const $ContainerInputPlaceholder = $("#container-input-placeholder") as AppInput;
    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;

    const isPlaceholderChanged = $ContainerInputPlaceholder.change;
    const isRequiredChanged = $radioButtonsRequired?.change;
    const isDispositionChanged = $radioButtonsPosition?.change;

    const newLabel =
      $ContainerInputLabel.change
        ? $ContainerInputLabel.value
        : $label.textContent;

    const newPlaceholder = isPlaceholderChanged
      ? $ContainerInputPlaceholder.value
      : $input?.getAttribute("placeholder") || '';

    const newCheckedRequired = isRequiredChanged
      ? $radioButtonsRequired.value
      : $input?.getAttribute("data-required") || '';

    const newCheckedPosition = isDispositionChanged
      ? $radioButtonsPosition.value
      : $label?.getAttribute("disposition") || '';

    if (newLabel === "" || !newLabel) return;

    parentElement.className = "";
    parentElement.classList.add("container-components");
    parentElement.classList.add(`container-control-${newCheckedPosition}`);

    $label.textContent = newLabel;
    $label.setAttribute("disposition", newCheckedPosition);
    const name = `${this.type}-${this.incrementId}-${newLabel}`;
    $input.setAttribute("placeholder", newPlaceholder);
    $input.setAttribute("data-required", newCheckedRequired);
    $input.setAttribute("name", name);

    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

    const updatedPages = pages.map((page) =>
      page.id === parentElement?.parentElement?.id
        ? {
          ...page,
          inputs: page.inputs.map((input) =>
            input.id === $input.id
              ? {
                ...input,
                disposition: newCheckedPosition,
                name,
                label: newLabel,
                placeholder:
                  newPlaceholder.trim() !== ""
                    ? newPlaceholder
                    : null,
                required:
                  newCheckedRequired.trim() === "true"
                    ? true
                    : false,
              }
              : input
          ),
        }
        : page
    );
    saveAtLocalStorage(updatedPages);
  }

  remove = (evt: Event) => {

    const target = evt.target as HTMLButtonElement;
    const parentDiv = target.closest(".container-components");
    const $lastChildren = parentDiv?.lastElementChild;

    if (!parentDiv) return;

    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

    const removeInput = pages.map((page) =>
      page.id === parentDiv?.parentElement?.id
        ? {
          ...page,
          inputs: page.inputs.filter(
            (input) => input.id !== $lastChildren?.id
          ),
        }
        : page
    );

    saveAtLocalStorage(removeInput);

    parentDiv.remove();
  }

  showPopUp = () => {
    modal({
      title: "update input text",
      content: () => this.bodyModal(this.target, {  isCreate: false }),
      action: this.update,
    });
  }

  bodyModal = (target, {  isCreate }) => {
    const $parentDiv = document.createElement("rain-modal-body");
    const $radioButtonsRequired = document.createElement("rain-radio-buttons-form");
    const $radioButtonsPosition = document.createElement("rain-radio-buttons-form");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsPosition.setAttribute('name', 'inputs-position');
    $radioButtonsRequired.id = "container-radios-required";

    $radioButtonsPosition.setAttribute("label", "Position:");
    $radioButtonsRequired.setAttribute('name', 'inputs-required');
    $radioButtonsPosition.id = "container-radios-position";


    const $ContainerInputLabel = inputComponent({
      name: "input-label",
      type: this.type,
      label: "Label",
      id: `container-input-label`,
    });

    const $ContainerInputPlaceholder = inputComponent({
      name: "input-placeholder",
      type: this.type,
      label: "Placeholder",
      id: "container-input-placeholder",
    });

    if (isCreate) {
      $radioButtonsRequired.setAttribute(
        "radios",
        JSON.stringify(REQUIRED_RADIOS)
      );
      $radioButtonsPosition.setAttribute(
        "radios",
        JSON.stringify(POSITION_RADIOS)
      );
    } else {
      const $parentInputs = target?.closest(".container-components");

      const $label = $parentInputs?.querySelector("label");
      const $input = $parentInputs?.querySelector("input");

      const newLabel = $label?.textContent || '';
      const newCheckedPosition = $label?.getAttribute("disposition");

      const newPlaceholder = $input?.getAttribute("placeholder") || '';
      const newCheckedRequired = $input?.getAttribute("data-required");

      if (!$parentInputs) return;

      const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedRequired,
      }));

      const updatedPositionRadios = POSITION_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedPosition,
      }));

      $ContainerInputLabel.setAttribute("new_value", newLabel);
      $ContainerInputPlaceholder.setAttribute("new_value", newPlaceholder);
      $radioButtonsRequired.setAttribute(
        "radios",
        JSON.stringify(updatedRequiredRadios)
      );
      $radioButtonsPosition.setAttribute(
        "radios",
        JSON.stringify(updatedPositionRadios)
      );
    }

    $parentDiv.appendChild($ContainerInputLabel);
    $parentDiv.appendChild($ContainerInputPlaceholder);
    $parentDiv.appendChild($radioButtonsRequired);
    $parentDiv.appendChild($radioButtonsPosition);

    return $parentDiv;
  }
}