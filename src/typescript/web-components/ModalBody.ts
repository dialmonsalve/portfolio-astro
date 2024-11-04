export default class ModalBody extends HTMLElement {
  static css = `
    :host {      
      display:flex;
      flex-direction:column;
      gap: 0.5rem; 
      width:100%;
    }
  `;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `<style>${ModalBody.css}</style>`;
  }

  connectedCallback() {
    const slot = document.createElement("SLOT");
    this.shadowRoot?.appendChild(slot);
  }
}

customElements.define("app-modal-body", ModalBody);
