interface RadioButton {
  value: string;
  labelText: string;
  name: string;
  id: string;
}

export default class AppRadioButtons extends HTMLElement {

  private radios: string
  private _value:string

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    this.radios = '[]';
    this._value = '';

    const link = document.createElement('LINK') as HTMLLinkElement;
    link.rel = 'stylesheet';
    link.href = new URL('./radio-buttons.css', import.meta.url).href;

    shadow.appendChild(link);
  }

  connectedCallback() {
    const radioButtons = JSON.parse(this.radios) as RadioButton[];

    radioButtons.forEach(({ value, labelText, name, id }) => {
      const radioButton = document.createElement('input') as HTMLInputElement;
      radioButton.type = 'radio';
      radioButton.name = name;
      radioButton.value = value;
      radioButton.id = id;
      radioButton.classList.add('radio')

      const label = document.createElement('label') as HTMLLabelElement;
      label.htmlFor = id;
      label.textContent = labelText;
      label.classList.add('label')

      radioButton.addEventListener('change', (evt)=>this.onChange(evt));

      this.shadowRoot?.appendChild(radioButton);
      this.shadowRoot?.appendChild(label);
    });
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string) {
    this.radios = newValue;
    this._value = newValue
  }

  static get observedAttributes() {
    return ['radios']
  }

  onChange(evt:Event){
    const target = evt.target as HTMLInputElement;
    this._value = target.value;
  }

  get value() {
    return this._value;
  }

}

customElements.define("app-radio-buttons", AppRadioButtons);