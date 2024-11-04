import { createImage } from "./createImage.js";

export function addImageByDrop(evt: DragEvent) {
    evt.preventDefault();
    let parent = null;

    const target = evt.target as HTMLInputElement;
    const tagName = target.tagName;

    const isSVG = tagName === "svg" || tagName === "path";
    const isInputText = tagName === "INPUT" && target.type === "text";
    const isInputFile = tagName === "INPUT" && target.type === "file";
    const isParentDiv = tagName === "DIV";

    if (isSVG || isInputText) {
        parent = target.closest(
            "div[id*='container-single']"
        ) as HTMLDivElement;
    } else if (isInputFile) {
        parent = target.previousElementSibling as HTMLDivElement;
    } else if (isParentDiv) {
        parent = target as HTMLDivElement;
    }
    const file = evt.dataTransfer?.files.item(0);

    createImage(file, parent);
}