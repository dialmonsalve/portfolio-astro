import { REQUIRED_RADIOS } from "../const";

const doc = document;

export default function bodyModal(target: HTMLElement) {
    const $parentDiv = doc.createElement("app-modal-body");
    const $radioButtonsRequired = doc.createElement("app-radio-buttons");
    const $containerArea = doc.createElement("app-textarea");

    $radioButtonsRequired.id = "container-radios-required";
    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsRequired.setAttribute('name', 'inputs-required');

    $containerArea.setAttribute("label", "Label");
    $containerArea.setAttribute("input_id", "area");
    $containerArea.id = "container-area-label";

    const $parentInputs = target.closest(".container-components");

    const $label = $parentInputs?.querySelector("label");
    const $input = $parentInputs?.querySelector('input');

    const newLabel = $label?.textContent || '';

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
    $parentDiv.appendChild($radioButtonsRequired);

    return $parentDiv;
}
