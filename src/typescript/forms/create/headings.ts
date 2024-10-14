import { create } from "../inputs/headings";
import smooth from "../utils/smoothWindow";

export default function headings() {
    const $headings = document.querySelector("#heading");
    let incrementId = 0;

    $headings?.addEventListener("click", () => {
        incrementId++;
        create(incrementId);
        smooth();
    });
}