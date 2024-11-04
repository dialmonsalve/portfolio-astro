export default class AppRadioButtons extends HTMLElement {
  private radios: [];
  private _value: string;
  private label: string;
  private _change: boolean;
  private name: string;
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    this.radios = [];
    this._value = "";
    this.label = "";
    this._change = false;
    this.name = "";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL("./styles/radio-buttons.css", import.meta.url).href;

    shadow.appendChild(link);
  }

  connectedCallback() {
    if (this.label !== "") {
      const $paragraph = document.createElement("P");
      $paragraph.textContent = this.label;
      this.shadowRoot?.appendChild($paragraph);
    }

    this.updateRadioButtons();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "radios") {
      this.radios = JSON.parse(newValue);
    } else if (name === "label") {
      this.label = newValue;
    } else if (name === "name") {
      this.name = newValue;
    } else {
      console.warn(`Unrecognized attribute: ${name}`);
    }
  }

  static get observedAttributes() {
    return ["radios", "label", "name"];
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

  updateRadioButtons() {
    const shadow = this.shadowRoot;
    this.radios.forEach(({ value, labelText, id, isChecked = false }) => {
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = this.name;
      radioButton.value = value;
      radioButton.id = id;
      radioButton.classList.add("radio");
      radioButton.checked = isChecked;

      const label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = labelText;
      label.classList.add("label");

      radioButton.addEventListener("change", (evt) => {
        this.onChange(evt);
      });

      shadow?.appendChild(radioButton);
      shadow?.appendChild(label);
    });
  }
}

customElements.define("app-radio-buttons", AppRadioButtons);
