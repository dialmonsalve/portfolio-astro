import { PAGES_STRING } from "../const";
import type { Page, RestUpdate, Inputs } from "../interface";
import type { Storage } from "../interface/storage";

const saveAtLocalStorage = (pages: Page[]) =>
    localStorage.setItem("pages", JSON.stringify(pages));

function create(lastChildren: HTMLElement, updateInputs: Inputs) {
    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

    const updatedPages = pages.map((page) => {
        if (page.id === lastChildren.id) {
            return {
                ...page,
                inputs: [...page.inputs, updateInputs],
            };
        }
        return page;
    });
    saveAtLocalStorage(updatedPages);
}

function update(target: HTMLButtonElement, rest: RestUpdate) {
    const pageAtObject = target?.closest(".container-card-form.card");
    const containerId = target?.closest(".container-components")?.id;

    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];
    const updatedPages = pages.map((page) =>
        page.id === pageAtObject?.id
            ? {
                ...page,
                inputs: page.inputs.map((input) =>
                    input.containerId === containerId
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

function remove(target: HTMLButtonElement) {
    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

    const pageAtObject = target.closest(".container-card-form.card");
    const containerId = target.closest(".container-components")?.id;

    const removeInput = pages.map((page) =>
        page.id === pageAtObject?.id
            ? {
                ...page,
                inputs: page.inputs.filter(
                    (input) => input.containerId !== containerId
                ),
            }
            : page
    );

    storage.saveAtLocalStorage(removeInput);
}

const storage: Storage = {
    create,
    update,
    remove,
    saveAtLocalStorage,
};

export default storage;