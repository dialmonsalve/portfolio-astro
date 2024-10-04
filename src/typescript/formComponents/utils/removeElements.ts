import saveAtLocalStorage from "./saveAtLocalStorage";

import { PAGES_STRING } from "../const";
import type { Page } from "../interface";

export default function removeElementForm(evt: Event) {
  const target = evt.target as HTMLDivElement;
  const parentDiv = target.closest(".container-components") as HTMLDivElement;
  const $lastChildren = parentDiv.lastElementChild;

  if (!parentDiv) return;

  const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

  const removeInput = pages.map((page) =>
    page.id === parentDiv?.parentElement?.id
      ? {
        ...page,
        inputs: page.inputs.filter(
          (input) => input.id !== $lastChildren?.id
        ),
      }
      : page
  );

  saveAtLocalStorage(removeInput);

  parentDiv.remove();
}
