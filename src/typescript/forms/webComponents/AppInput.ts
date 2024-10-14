
export default class AppInput extends HTMLElement {

  private _value: string;
  private _change: string
  private name: string;
  private type: string;
  private inputId: string;
  private label: string;
  private root: ShadowRoot;

  constructor() {
    super();

    this.type = '';
    this.inputId = '';
    this.name = '';
    this.label = '';

    this._value = ''
    this._change = 'false'

    this.root = this.attachShadow({ mode: "open" });

    const link = document.createElement('LINK') as HTMLLinkElement;
    const $input = document.createElement("INPUT") as HTMLInputElement;
    const $label = document.createElement("LABEL") as HTMLLabelElement;

    link.rel = 'stylesheet';
    link.href = new URL('./styles/inputs.css', import.meta.url).href;

    this.root.appendChild(link);
    this.root?.appendChild($label);
    this.root?.appendChild($input);
  }

  static get observedAttributes() {
    return ["type", "name", "label", "input-id", "_value"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    switch (name.toLowerCase()) {
      case "label":
        this.label = newValue;
        break;
      case "input-id":
        this.inputId = newValue;
        break;
      case "type":
        this.type = newValue;
        break;
      case "name":
        this.name = newValue;
        break;
      case "_value":
        this._value = newValue;
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist`);
    }

  }
  connectedCallback() {
    const $label = this.root?.querySelector('label') || document.createElement('LABEL') as HTMLLabelElement;
    const $input = this.root?.querySelector('input') || document.createElement('INPUT') as HTMLInputElement;

    $label.textContent = this.label;
    $label.htmlFor = this.inputId || '';

    $input.id = this.inputId;
    $input.type = this.type;
    $input.setAttribute('name', this.name);
    $input.value = this._value

    $input.addEventListener("change", (evt) => this.onChange(evt));

  }

  onChange(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this._value = target.value;
    this._change = "true";
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get change() {
    return this._change;
  }

}

customElements.define("app-input", AppInput);