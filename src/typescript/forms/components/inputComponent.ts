import type { AppInput } from "../webComponents";

interface InputComponent {
    name: string;
    type?: string ;
    label: string;
    id: string;

}

export default function inputComponent({ name, type, label, id }: InputComponent): AppInput {

    const $containerInput = document.createElement("app-input") as AppInput;

    $containerInput.setAttribute("name", name);
    $containerInput.setAttribute("type", type || '');
    $containerInput.setAttribute("label", label);
    $containerInput.setAttribute("input_id", name);
    $containerInput.id = id;

    return $containerInput;
}

export class IptComponent {
    private name: string;
    private type: string;
    private label: string;
    private id: string;
    $containerInput: AppInput;
    constructor(optionsInputComponent: InputComponent) {
        const { id, label, name, type, } = optionsInputComponent

        this.$containerInput = document.createElement("app-input") as AppInput
        this.id = id;
        this.label = label;
        this.name = name;
        this.type = type || ''

        this.$containerInput.setAttribute("name", this.name);
        this.$containerInput.setAttribute("type", this.type);
        this.$containerInput.setAttribute("label", this.label);
        this.$containerInput.setAttribute("input_id", this.name);
        this.$containerInput.id = this.id;

    }

    get create(): AppInput {
        return this.$containerInput
    }


}