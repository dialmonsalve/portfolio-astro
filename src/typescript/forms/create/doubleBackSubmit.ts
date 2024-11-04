import { create } from "../inputs/DoubleButtonForm.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);

export default function doubleBackNext() {
    let incrementId = 0;

    const $buttonDoubleBackSubmit = $("#double-back-submit");

    $buttonDoubleBackSubmit?.addEventListener("click", () => {
        incrementId++;
        create({ type: "submit", incrementId, buttonType: "submit" });
        smooth();
    });
}
