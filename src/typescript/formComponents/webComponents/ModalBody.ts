export default class AppModalBody extends HTMLElement {
  static css = `
    :host {      
      display:flex;
      flex-direction:column;
      gap: 1rem; 
    }
  `
  constructor() {

    super();

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `<style>${AppModalBody.css}</style>`;

  }

  connectedCallback() {
    const slot = document.createElement('SLOT');
    this.shadowRoot?.appendChild(slot);
  }
}

customElements.define("app-modal-body", AppModalBody)