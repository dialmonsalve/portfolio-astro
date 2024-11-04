import { create } from "../inputs/checkbox.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function checkbox() {
    const $checkbox = $("#checkbox");
    let incrementId = 0;

    $checkbox?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });
}
