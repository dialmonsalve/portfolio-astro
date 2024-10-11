import storage from "./saveAtLocalStorage";

export default function removeElementForm(evt: Event) {
  const target = evt.target as HTMLDivElement;
  const parentDiv = target.closest(".container-components") as HTMLDivElement;
  const $lastChildren = parentDiv.lastElementChild;

  if (!parentDiv) return;

  storage.remove(parentDiv, $lastChildren);

  parentDiv.remove();
}
