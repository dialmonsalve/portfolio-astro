
import { create } from "../inputs/files";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector:string) => doc.querySelector(selector);

export default function files() {
    const $files = $("#files");
    let incrementId = 0;

    $files?.addEventListener("click", () => {
        incrementId++;
        create(incrementId);
        smooth();
    });
}