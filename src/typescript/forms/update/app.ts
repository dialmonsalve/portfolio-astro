import "../web-components/index.js";
import updatePage from "./updatePage.js";

import navigateInPage from "../utils/navigateInPage.js";
import storage from "../utils/saveAtLocalStorage.js";
import headings from "./headings.js";
import paragraph from "./paragraph.js";

import input from "./textEmailPhonePassword.js";

const doc = document;
const $ = (selector) => doc.querySelector(selector);
const $$ = (selector) => doc.querySelectorAll(selector);
const $containerForms = $("#container-forms");

(() => {
    const uuid = $("#formId").value;
    const key = $(`#userToken`).value;
    const userId = $("#userId").value;

    const url = `/api/admin/forms/${uuid}`;

    fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${key}`,
            "X-rain": userId,
        },
    }).then(async (resp) => storage.saveAtLocalStorage(await resp.json()));

    updatePage();
    navigateInPage();
    headings();
    paragraph();
    input({ type: "text" });
    input({ type: "email" });
    input({ type: "phone" });
    input({ type: "password" });
})();
