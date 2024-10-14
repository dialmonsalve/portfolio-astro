import { REQUIRED_RADIOS } from "../const";

const doc = document;

export default function bodyModal(target: HTMLButtonElement, showPhoto: boolean) {
    const $parentDiv = doc.createElement("app-modal-body");
    const $radioButtonsRequired = doc.createElement("app-radio-buttons");
    const $containerArea = doc.createElement("app-textarea");

    $radioButtonsRequired.id = "container-radios-required";
    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsRequired.setAttribute("name", "inputs-required");

    $containerArea.setAttribute("label", "Label");
    $containerArea.setAttribute("input_id", "area");
    $containerArea.id = "container-area-label";

    const $parentContainer = target.closest(".container-components");

    const $parentInputs = $parentContainer?.lastElementChild;

    const $label = $parentInputs?.querySelector("label");
    const $input = $parentInputs?.querySelector("input[type='file']");

    let labelText = "";

    $label?.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            labelText += node.textContent;
        }
    });

    const newLabel = labelText;

    const newCheckedRequired = $input?.getAttribute("data-required");

    if (!$parentInputs) return;

    const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedRequired,
    }));

    $containerArea.setAttribute("new_value", newLabel);
    $radioButtonsRequired.setAttribute(
        "radios",
        JSON.stringify(updatedRequiredRadios)
    );

    $parentDiv.appendChild($containerArea);
    if (!showPhoto) {

        $parentDiv.appendChild($radioButtonsRequired);
    }

    return $parentDiv;
}
