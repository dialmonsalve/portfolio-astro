import storage from "./saveAtLocalStorage";

export default function removeElementForm(evt:MouseEvent) {
    const target = evt.target as HTMLButtonElement;
    const parentDiv = target.closest(".container-components");

    if (!parentDiv) return;

    storage.remove(target);

    parentDiv.remove();
}
