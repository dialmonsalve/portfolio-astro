export default class AppInput extends HTMLElement {
  private label: string;
  private type: string;
  private name: string;
  private input_id: string;
  private _value: string;
  private new_value: string;
  private _change: boolean;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    this.label = "";
    this.type = "";
    this.name = "";
    this.input_id = "";
    this._value = "";
    this.new_value = "";
    this._change = false;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL("./styles/input.css", import.meta.url).href;

    shadow.appendChild(link);
  }

  connectedCallback() {
    const input = document.createElement("input");
    input.type = this.type;
    input.name = this.name;
    input.id = this.input_id;
    input.value = this.new_value;
    input.classList.add("input");

    const label = document.createElement("label");
    label.htmlFor = this.input_id;
    label.textContent = this.label;
    label.classList.add("label");

    input.addEventListener("change", (evt) => this.onChange(evt));

    this.shadowRoot?.appendChild(label);
    this.shadowRoot?.appendChild(input);
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case "label":
        this.label = newValue;
        return;
      case "type":
        this.type = newValue;
        return;
      case "name":
        this.name = newValue;
        return;
      case "input_id":
        this.input_id = newValue;
        return;
      case "_value":
        this._value = newValue;
        return;
      case "new_value":
        this.new_value = newValue;
        return;
      default:
        console.warn(`Attribute not reconnoitred: ${name}`);
    }
  }

  static get observedAttributes() {
    return ["type", "name", "_value", "new_value", "label", "input_id"];
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
    return this._change;
  }

  set value(newValue) {
    this._value = newValue;
    const container = this.shadowRoot?.querySelector(
      `#rain-input-form`,
    ) as this;
    container.value = newValue;
  }
}

customElements.define("app-input", AppInput);
