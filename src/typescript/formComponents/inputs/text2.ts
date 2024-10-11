import Input from "../classes/Input";
import inputComponent from "../components/inputComponent";
import modal from "../components/modal";
import { POSITION_RADIOS, REQUIRED_RADIOS } from "../const";



export default function text() {
	let incrementId = 0;
	const $text = document.querySelector('#text');


	$text?.addEventListener("click", (evt) => {
		incrementId++;

		const $input = new Input({ type: 'text', incrementId, target: evt.target as HTMLInputElement })
		modal({
			title: "create title",
			content: () => bodyModal(evt.target as HTMLDivElement, { type: 'text', isCreate: true }),
			action: () => $input.create('Text'),
		});
	});
}

export function bodyModal(target: HTMLDivElement | null, { type, isCreate }: { type: string, isCreate: boolean }) {
	console.log(target);

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
		type,
		label: "Label",
		id: `container-input-label`,
	});

	const $ContainerInputPlaceholder = inputComponent({
		name: "input-placeholder",
		type,
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