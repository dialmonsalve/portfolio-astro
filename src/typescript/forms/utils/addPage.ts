import button from "../components/button";
import storage from "./saveAtLocalStorage";
import smooth from "./smoothWindow";
import removePage from "./removePage";
import { PAGES_STRING } from "../const";
import type { Page } from "../interface";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerForms = $("#container-forms");

export default function addPage(evt: Event, incrementId: number) {
    incrementId++;
    const buttonIdRemove = `remove-page-${incrementId}`;
    const buttonIdCreate = "add-page";

    const target = evt.target as HTMLButtonElement;
    const page = document.createElement("DIV");

    const buttonAdd = button(
        {
            id: buttonIdCreate,
            text: "add-page",
            spanClass: "button-square-plus",
            buttonClass: "card__button-add-page",
        },
        (evt) => addPage(evt, incrementId)
    );

    const buttonDelete = button(
        {
            id: buttonIdRemove,
            text: "remove-page",
            spanClass: "button-square-remove",
            buttonClass: "card__button-remove-page",
        },
        (evt) => removePage(evt, incrementId)
    );

    page.classList.add("container-card-form", "card");
    page.id = `card-${incrementId}`;

    page.appendChild(buttonAdd);
    page.appendChild(buttonDelete);
    $containerForms?.appendChild(page);

    const parentButton = target?.closest("#add-page");

    if (!parentButton) return;

    parentButton.remove();

    const newPage = {
        buttonIdRemove,
        buttonIdUpdate: buttonIdCreate,
        containerId: "",
        containerPosition: incrementId,
        id: page.id,
        inputs: [],
        page: "Container",
    };

    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

    const oldPage = pages.map((page) => {
        page.id === `card-${incrementId}`;

        return {
            ...page,
            buttonIdUpdate: null,
        };
    });
    const updatedPages = [...oldPage, newPage];
    storage.saveAtLocalStorage(updatedPages);

    smooth();
}
