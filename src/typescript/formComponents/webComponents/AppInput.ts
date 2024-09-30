interface RadioButton {
  value: string;
  labelText: string;
  name: string;
  id: string;
}

export default class AppInput extends HTMLElement {

  private type: string
  // private name:string
  private labelText:string;
  private _value:string
  

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    this.type = '';
    this._value = '';
    // this.name = '';
    this.labelText = '';

    const link = document.createElement('LINK') as HTMLLinkElement;
    link.rel = 'stylesheet';
    link.href = new URL('./inputs.css', import.meta.url).href;

    shadow.appendChild(link);
  }

  connectedCallback() {

      const input = document.createElement('INPUT') as HTMLInputElement;
      input.type = this.type;
      // input.name = this.name;
      input.value = this._value;
      // input.id = this.id;
      // input.classList.add('input')

      const label = document.createElement('LABEL') as HTMLLabelElement;
      label.htmlFor = this.id;
      label.textContent = this.labelText;
      label.classList.add('label')

      input.addEventListener('change', (evt)=>this.onChange(evt));

      this.shadowRoot?.appendChild(label);
      this.shadowRoot?.appendChild(input);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string) {
    this.type = newValue;
    this.labelText = newValue;
    // this._value = newValue
  }

  static get observedAttributes() {
    return ['type', 'name', 'value', 'labelText', 'className']
  }

  onChange(evt:Event){
    const target = evt.target as HTMLInputElement;
    // this._value = target.value;
  }

  // get value() {
  //   return this._value;
  // }

}

customElements.define("app-input", AppInput);