import type { IButton } from "../interface/button";
import { element } from "../utils/utilities";
const { create, textNode } = element;

interface ConstructorButton {
  text: string;
  buttonId: string;
  spanClass: string;
  buttonClass: string;
}

export default class Button implements IButton {

  text: string;
  buttonId: string;
  spanClass: string;
  buttonClass: string;
  $button: HTMLButtonElement;

  constructor(button: ConstructorButton,) {

    const { buttonClass, buttonId, spanClass, text } = button;

    this.buttonClass = buttonClass;
    this.buttonId = buttonId;
    this.spanClass = spanClass;
    this.text = text;

    this.$button = create('button');
    const $span = create("span");

    const buttonText = textNode(this.text);

    this.$button.id = this.buttonId;
    this.$button.classList.add(this.buttonClass);

    $span.classList.add(this.spanClass);

    this.$button.appendChild(buttonText);
    this.$button.appendChild($span);
  }

  get create(): HTMLButtonElement {
    return this.$button
  }

  action = (fn: (evt: MouseEvent) => void) => this.$button.addEventListener('click', fn)

}