
export default class AppInput extends HTMLElement {

  private type: string
  private name: string
  private _value: string
  private label: string;
  private input_id: string;
  private new_value: string;
  private _change: boolean

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    this.type = '';
    this._value = '';
    this.label = "";
    this.name = "";
    this.input_id = "";
    this._value = "";
    this.new_value = "";
    this._change = false

    const link = document.createElement('LINK') as HTMLLinkElement;
    link.rel = 'stylesheet';
    link.href = new URL('./styles/inputs.css', import.meta.url).href;

    shadow.appendChild(link);
  }

  connectedCallback() {
    const input = document.createElement("INPUT") as HTMLInputElement;

    input.type = this.type;
    input.name = this.name;
    input.id = this.input_id;
    input.value = this.new_value;

    const label = document.createElement("LABEL") as HTMLLabelElement;
    label.htmlFor = this.input_id;
    label.textContent = this.label;
    label.classList.add("label");

    input.addEventListener("change", (evt) => this.onChange(evt));

    this.shadowRoot?.appendChild(label);
    this.shadowRoot?.appendChild(input);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "label":
        this.label = newValue;
        break;
      case "type":
        this.type = newValue;
        break;
      case "name":
        this.name = newValue;
        break;
      case "input_id":
        this.input_id = newValue;
        break;
      case "_value":
        this._value = newValue;
        break;
      case "new_value":
        this.new_value = newValue;
        break;
      default:
        console.warn(`Atributo no reconocido: ${name}`);
    }
  }

  static get observedAttributes() {
    return ["type", "name", "_value", "new_value", "label", "input_class", "input_id"];
  }

  onChange(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this._value = target.value;
    this._change = true;
  }

  get value() {
    return this._value;
  }

  get change() {
    return this._change
  }

  set value(newValue: string) {
    this._value = newValue;
    const shadow = this.shadowRoot?.querySelector(`#app-input-form`) as AppInput;
    shadow.value = newValue;
  }

}

customElements.define("app-input", AppInput);