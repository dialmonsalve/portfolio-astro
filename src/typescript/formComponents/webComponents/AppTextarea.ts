export default class AppTextareaForm extends HTMLElement {
    private label: string;
    private name: string;
    private input_class: string;
    private input_id: string;
    private _value: string;
    private new_value: string;
    private _change: boolean
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        this.label = "";
        this.name = "";
        this.input_class = "";
        this.input_id = "";
        this._value = "";
        this.new_value = "";
        this._change = false

        const link = document.createElement("LINK") as HTMLLinkElement;
        link.rel = "stylesheet";
        link.href = new URL("./styles/textarea.css", import.meta.url).href;

        shadow.appendChild(link);
    }

    connectedCallback() {
        const textarea = document.createElement("TEXTAREA") as HTMLTextAreaElement;
        const className = this.input_class === "" ? "textarea" : this.input_class;
        textarea.name = this.name;
        textarea.id = this.input_id;
        textarea.value = this.new_value;
        textarea.classList.add(className);

        const label = document.createElement("LABEL") as HTMLLabelElement
        label.htmlFor = this.input_id;
        label.textContent = this.label;
        label.classList.add("label");

        textarea.addEventListener("change", (evt) => this.onChange(evt));

        this.shadowRoot?.appendChild(label);
        this.shadowRoot?.appendChild(textarea);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case "label":
                this.label = newValue;
                break;
            case "name":
                this.name = newValue;
                break;
            case "input_class":
                this.input_class = newValue;
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
        return [
            "name",
            "_value",
            "new_value",
            "label",
            "input_class",
            "input_id",
        ];
    }

    onChange(evt: Event) {
        const target = evt.target as HTMLInputElement;
        this._value = target.value;
        this._change = true
    }

    get value() {
        return this._value;
    }
}

customElements.define("rain-textarea-form", AppTextareaForm);