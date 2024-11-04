import storage from "./saveAtLocalStorage";

import button from "../components/button";
import addPage from "./addPage";
import { PAGES_STRING } from "../const";
import type { Page } from "../interfaces";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerForms = $(".container-forms");

export default function removePage(evt: MouseEvent, incrementId: number) {
  const target = evt.target as HTMLButtonElement;

  const parentDiv = target.closest(".container-card-form.card");

  const buttonAdd = button(
    {
      id: "add-page",
      text: "add-page",
      spanClass: "button-square-add",
      buttonClass: "card__button-add",
    },
    (evt) => addPage(evt, incrementId),
  );

  if (!parentDiv) return;

  const isLastCard = parentDiv === $containerForms?.lastElementChild;
  const previousCard = $containerForms?.querySelector(
    ".container-card-form.card:nth-last-child(2)",
  );
  const pages = JSON.parse(
    localStorage.getItem("pages") || PAGES_STRING,
  ) as Page[];

  let updatedPages;

  if ($containerForms?.children.length === 2) {
    previousCard?.appendChild(buttonAdd);
    parentDiv.remove();
    updatedPages = pages.reduce((acc, page) => {
      if (page.id !== parentDiv.id) {
        acc.push({
          ...page,
          buttonIdUpdate: "add-page",
        });
      }
      return acc;
    }, [] as Page[]);
  } else if (isLastCard) {
    previousCard?.appendChild(buttonAdd);
    parentDiv.remove();
    updatedPages = pages.filter((page) => page.id !== parentDiv.id);
  } else {
    parentDiv.remove();
    updatedPages = pages.filter((page) => page.id !== parentDiv.id);
  }

  storage.saveAtLocalStorage(updatedPages);
}
