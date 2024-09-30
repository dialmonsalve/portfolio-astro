interface RadioButton {
  value: string;
  labelText: string;
  name: string;
  id: string;
}

export default class AppInput extends HTMLElement {

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });


    const link = document.createElement('LINK') as HTMLLinkElement;
    link.rel = 'stylesheet';
    // link.href = new URL('./', import.meta.url).href;

    shadow.appendChild(link);
  }

  connectedCallback() {

  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string) {
  }

  static get observedAttributes() {
    return []
  }

  onChange(evt:Event){

  }

  get value() {
    return []
  }

}

customElements.define("app-input", AppInput);