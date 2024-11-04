import { create } from "../inputs/headings.js";
import smooth from "../utils/smoothWindow.js";

export default function headings() {
    const $headings = document.querySelector("#heading");
    let incrementId = 0;

    $headings?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });
}
