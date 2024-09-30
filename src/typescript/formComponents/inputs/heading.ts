import modal from "../components/modal";
import type { AppRadioButtons } from "../webComponents";

interface RadioButtons {
  name: string;
  value: string;
  labelText: string;
  id: string
}

const doc = document;
const headingButton: HTMLButtonElement | null = doc.querySelector("#heading");
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $('.container-forms');


const radioButtonsData: RadioButtons[] = [
  {
    name: 'radio-headings',
    value: 'h2',
    labelText: 'title',
    id: 'radio-h2'
  },
  {
    name: 'radio-headings',
    value: 'h3',
    labelText: 'subtitle',
    id: 'radio-h3'
  },
]

export default function heading() {

  headingButton?.addEventListener("click", function (evt) {
    modal({
      title: "Crear títulos",
      content: addComponent,
      action: () => add(evt.target)
    });
  });
}

function addComponent(): HTMLElement {

  const $parentDiv = doc.createElement('modal-body');
  const $radioButtons = doc.createElement('app-radio-buttons');
  const $input = doc.createElement('app-input');

  $input.setAttribute('type', 'text');
  $input.setAttribute('labelText', 'text');
  $input.setAttribute('hola', 'mundo');

  $radioButtons.id = 'container-radios-headings';
  $radioButtons.setAttribute('radios', JSON.stringify(radioButtonsData));

  $parentDiv.appendChild($input);
  $parentDiv.appendChild($radioButtons);

  return $parentDiv;
}

function add(target: EventTarget | null) {

  const $radioButtons = $('#container-radios-headings') as AppRadioButtons;

  const $lastChildren = $containerCards?.lastElementChild;

  const $heading = doc.createElement($radioButtons.value)

  $lastChildren?.appendChild($heading);

  console.log($lastChildren);

}

