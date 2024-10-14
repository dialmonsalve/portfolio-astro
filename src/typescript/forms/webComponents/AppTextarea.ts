export default class AppTextareaForm extends HTMLElement {

  private root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });

    const $textarea = document.createElement("TEXTAREA") as HTMLTextAreaElement;
    const $label = document.createElement("LABEL") as HTMLLabelElement

    const link = document.createElement("LINK") as HTMLLinkElement;
    link.rel = "stylesheet";
    link.href = new URL("./styles/textarea.css", import.meta.url).href;

    this.root.appendChild(link);

    this.root?.appendChild($label);
    this.root?.appendChild($textarea);
  }

  static get observedAttributes() {
    return [
      "name",
      "value",
      "label",
      "input-id",
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const $textarea = this.root?.querySelector('textarea') || document.createElement('textarea');
    const $label = this.root?.querySelector('label') || document.createElement('label');

    switch (name.toLocaleLowerCase()) {
      case "label":
        $label.textContent = newValue;
        break;
      case "name":
        $textarea.setAttribute('name', newValue)
        break;
      case "input-id":
        $textarea.id = newValue;
        $label.htmlFor = newValue;
        break;
      case "value":
        $textarea.value = newValue;
        break;
      default:
        throw new Error(`Attribute ${name} doesn't exist`);
    }
  }

  connectedCallback() {
    const $textarea = this.root?.querySelector('textarea');

    $textarea?.addEventListener("change", (evt) => this.onChange(evt));
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value: string | null) {
    typeof value === 'string' && this.setAttribute('label', value)
  }

  get name() {
    return this.getAttribute('change');
  }

  set name(value: string | null) {
    typeof value === 'string' && this.setAttribute('name', value)
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value: string | null) {
    typeof value === 'string' && this.setAttribute('value', value)
  }

  get inputId() {
    return this.getAttribute('input-id');
  }

  set inputId(value: string | null) {
    typeof value === 'string' && this.setAttribute('input-id', value)
  }

  get change() {
    return this.getAttribute('change');
  }

  set change(value: string | null) {
    typeof value === 'string' && this.setAttribute('change', value)
  }

  onChange(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.value = target.value;
    this.change = 'true'
    console.log(target.value);

  }
}

customElements.define("app-textarea", AppTextareaForm);