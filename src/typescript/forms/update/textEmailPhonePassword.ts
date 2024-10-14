import { configure, create } from "../inputs/textEmailPhonePassword.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector) => doc.querySelector(selector);
const $$ = (selector) => doc.querySelectorAll(selector);

export default function input({type}) {
    const $element = $(`#${type}`);

    const $allButtonsUpdate = $$(`.card button[id*="${type}-update"]`);
    const $allButtonsRemove = $$(`.card button[id*="${type}-remove"]`);
    let incrementId = $$(`.card button[id*="${type}-update"]`).length;

    $element.addEventListener("click", () => {
        incrementId++;
        create(incrementId, { object: "Email", type: "email" });
        smooth()
    });

    for (let i = 0; i < $allButtonsUpdate.length; i++) {
        const buttonUpdate = $allButtonsUpdate[i];
        buttonUpdate.addEventListener("click", (evt)=>configure(evt.target, incrementId, type) );
    };

    for (let i = 0; i < $allButtonsRemove.length; i++) {
        const buttonRemove = $allButtonsRemove[i];
        buttonRemove.addEventListener("click", removeElementForm);
    };
}