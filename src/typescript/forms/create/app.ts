import "../webComponents";
import storage from "../utils/saveAtLocalStorage";

import createPage from "./createPage";

import buttonNext from "./buttonNext";
import buttonSubmit from "./buttonSubmit";
import checkbox from "./checkbox";
import date from "./dateDateTimeTextarea";
import doubleBackNext from "./doubleBackNext";
import doubleBackSubmit from "./doubleBackSubmit";
import files from "./files";
import headings from "./headings";
import image from "./image";
import input from "./textEmailPhonePassword";
import multiImage from "./multiImage";
import number from "./number";
import paragraph from "./paragraph";
import radioButtons from "./radioButtons";
import select from "./select";
import signature from "./signature";
import singleImage from "./singleImage";

import navigateInPage from "../utils/navigateInPage";

const $ = (selector: string) => document.querySelector(selector);

(() => {

    const userId = $("#userId") as HTMLInputElement;
    const userToken = $("#userToken") as HTMLInputElement;
    const route = $("#route") as HTMLInputElement;

    const $buttonCreateForm = $("#create-form");

    const inputs = $("#inputs") as HTMLInputElement;

    const pages = JSON.parse(
        `[{ 
            "page": "Container", 
            "id": "card-1", 
            "buttonIdUpdate": "add-page",
            "containerPosition": 1,
            "buttonIdRemove":null,
            "containerId": "",
            "inputs": []
        }]`
    );

    storage.saveAtLocalStorage(pages);

    navigateInPage();
    createPage();
    headings();
    paragraph();
    input({ type: "Text" });
    input({ type: "Email" });
    input({ type: "Phone" });
    input({ type: "Password" });
    number();
    date({ object: "Date", type: "date", input: "INPUT" });
    date({ object: "DateTime", type: "time", input: "INPUT" });
    date({ object: "Textarea", type: "textarea", input: "TEXTAREA" });
    checkbox();
    signature();
    select();
    radioButtons();
    singleImage();
    multiImage();
    files();
    // image({ userId: userId.value, userToken: userToken.value, route: route.value });
    // buttonNext();
    // buttonSubmit();
    // doubleBackNext();
    // doubleBackSubmit();


    $buttonCreateForm?.addEventListener("click", () => {
        const currentParentWithBackSubmit = localStorage.getItem("pages") || '[]';
        inputs.value = currentParentWithBackSubmit;
    });
})();
