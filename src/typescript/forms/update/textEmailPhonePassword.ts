import modal from "../components/modal.js";
import { create, bodyModal, update } from "../inputs/textEmailPhonePassword.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $$ = (selector: string) => doc.querySelectorAll(selector);

type TypeInput = "Text" | "Email" | "Phone" | "Password";


export default function input({ type }:{type: TypeInput}) {
    const lowerType = type.toLocaleLowerCase() as "text" | "email" | "phone" | "password";
    const $element = $(`#${lowerType}`);

    const $allButtonsUpdate = $$(`.card button[id*="${lowerType}-update"]`);
    const $allButtonsRemove = $$(`.card button[id*="${lowerType}-remove"]`);
    let incrementId = $$(`.card button[id*="${lowerType}-update"]`).length;

    $element?.addEventListener("click", () => {
        incrementId++;
        create({
            incrementId,
            object: type,
            type: lowerType === "password" ? "text" : lowerType,
        });
        smooth();
    });

    for (let i = 0; i < $allButtonsUpdate.length; i++) {
        const buttonUpdate = $allButtonsUpdate[i];
        buttonUpdate.addEventListener("click", (evt) =>

            modal({
                title: `update input ${type}`,
                content: () =>
                    bodyModal(evt.target as HTMLButtonElement, { type: lowerType }),
                action: () =>
                    update(evt.target as HTMLButtonElement, {
                        incrementId,
                        type: lowerType === "password" ? "text" : lowerType,
                    }),
            })
        );
    }

    for (let i = 0; i < $allButtonsRemove.length; i++) {
        const buttonRemove = $allButtonsRemove[i] as HTMLButtonElement;
        buttonRemove.addEventListener("click", removeElementForm);
    }
}
