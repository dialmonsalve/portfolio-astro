import { create } from "../inputs/DoubleButtonForm.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);

export default function doubleBackNext() {
    let incrementId = 0;

    const $buttonDoubleBackNext = $("#double-back-next");

    $buttonDoubleBackNext?.addEventListener("click", () => {
        incrementId++;
        create({ type: "next", incrementId, buttonType: "button" });
        smooth();
    });
}
