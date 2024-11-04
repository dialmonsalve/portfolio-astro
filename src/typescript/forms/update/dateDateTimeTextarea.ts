import modal from "../components/modal.js";
import { create, bodyModal, update } from "../inputs/dateDateTimeTextarea.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $$ = (selector: string) => doc.querySelectorAll(selector);

interface Options {
    object: Obj;
    type: InputType;
    input: Input;
}

type InputType = "date" | "time" | "textarea";
type Input = "textarea" | "input";
type Obj = "Date" | "DateTime" | "Textarea";

export default function dateOrArea({ type, object, input }: Options) {

    const $input = $(`#${type}`);
    const $allButtonsUpdate = $$(`.card button[id*="${type}-update"]`);
    const $allButtonsRemove = $$(`.card button[id*="${type}-remove"]`);

    let incrementId = $$(`.card button[id*="${type}-update"]`).length;

    $input?.addEventListener("click", () => {
        incrementId++;
        create({
            incrementId,
            object,
            type,
            input,
        });
        smooth();
    });

    for (let i = 0; i < $allButtonsUpdate.length; i++) {
        const buttonUpdate = $allButtonsUpdate[i];
        buttonUpdate.addEventListener("click", (evt) =>
            modal({
                title: "update input text",
                content: () =>
                    bodyModal(evt.target as HTMLButtonElement, { input }),
                action: () =>
                    update(evt.target as HTMLButtonElement, {
                        incrementId,
                        type,
                        input,
                    }),
                twoButtons: false,
            })
        );
    }

    for (let i = 0; i < $allButtonsRemove.length; i++) {
        const buttonRemove = $allButtonsRemove[i] as HTMLButtonElement;
        buttonRemove.addEventListener("click", removeElementForm);
    }
}
