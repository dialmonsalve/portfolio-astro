import modal from "../components/modal";
import type { AppRadioButtons } from "../webComponents";

interface RadioButtons {
  name: string;
  value: string;
  labelText: string;
  id: string
}

const headingButton: HTMLButtonElement | null = document.querySelector("#heading");
const $ = (selector: keyof HTMLElementTagNameMap) => document.querySelector(selector);

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

  const $parentDiv = document.createElement('modal-body');
  const $radioButtons = document.createElement('app-radio-buttons');
  $radioButtons.id = 'container-radios-headings';
  $radioButtons.setAttribute('radios', JSON.stringify(radioButtonsData));

  $parentDiv.appendChild($radioButtons);

  return $parentDiv;
}

function add(target: EventTarget | null) {

  const $radioButtons = document.querySelector('#container-radios-headings') as AppRadioButtons;

  console.log({value: $radioButtons?.value});




}

