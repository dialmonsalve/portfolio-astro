import { PAGES_STRING } from "../const";
import type { Page } from "../interface";

const saveAtLocalStorage = (pages: Page[]) =>
    localStorage.setItem("pages", JSON.stringify(pages) || PAGES_STRING);

function create(updateInputs, lastChildren) {
    const pages = JSON.parse(localStorage.getItem("pages"));

    const updatedPages = pages.map((page) => {
        if (page.id === lastChildren.getAttribute("id")) {
            return {
                ...page,
                inputs: [...page.inputs, updateInputs],
            };
        }
        return page;
    });
    saveAtLocalStorage(updatedPages);
}

function update(parentElement, element, rest) {
    const pages = JSON.parse(localStorage.getItem("pages"));
    const updatedPages = pages.map((page) =>
        page.id === parentElement.parentElement.id
            ? {
                ...page,
                inputs: page.inputs.map((input) =>
                    input.id === element.id
                        ? {
                            ...input,
                            ...rest,
                        }
                        : input
                ),
            }
            : page
    );
    saveAtLocalStorage(updatedPages);
}

function remove(parentDiv, lastChildren) {
    const pages = JSON.parse(localStorage.getItem("pages"));

    const removeInput = pages.map((page) =>
        page.id === parentDiv.parentElement.id
            ? {
                ...page,
                inputs: page.inputs.filter(
                    (input) => input.id !== lastChildren.id
                ),
            }
            : page
    );

    storage.saveAtLocalStorage(removeInput);
}

const storage = {
    create,
    update,
    remove,
    saveAtLocalStorage,
};

export default storage;