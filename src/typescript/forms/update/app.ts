import "../web-components";

import buttonNext from "./buttonNext";
import buttonSubmit from "./buttonSubmit";
import checkbox from "./checkbox";
import dateOrArea from "./dateDateTimeTextarea";
import doubleBackNext from "./doubleBackNext";
import doubleBackSubmit from "./doubleBackSubmit";
import files from "./files";
import headings from "./headings";
import image from "./image";
import input from "./textEmailPhonePassword";
import multiImage from "./multiImage";
import number from "./number";
import paragraph from "./paragraph";
import photo from "./photo";
import radioButtons from "./radioButtons";
import select from "./select";
import signature from "./signature";
import singleImage from "./singleImage";
import updatePage from "./updatePage";
import navigateInPage from "../utils/navigateInPage";

import { PAGES_STRING } from "../const";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

(() => {
  const $title = $("#main-form-title") as HTMLHeadingElement;
  const title = $("#titleInput") as HTMLInputElement;

  const $descriptionForm = $("#description-form") as HTMLInputElement;
  const $description = $("#description") as HTMLTextAreaElement;

  const inputs = $("#inputs") as HTMLInputElement;
  const sendDivision = $("#division-selected") as HTMLInputElement;
  const $selectDivision = $("#header-select-division") as HTMLSelectElement;

  const submit = $("#update-form");

  updatePage();
  navigateInPage();
  headings();
  paragraph();
  input({ type: "Text" });
  input({ type: "Email" });
  input({ type: "Phone" });
  input({ type: "Password" });
  number();
  dateOrArea({ object: "Date", type: "date", input: "input" });
  dateOrArea({ object: "DateTime", type: "time", input: "input" });
  dateOrArea({ object: "Textarea", type: "textarea", input: "textarea" });
  signature();
  select();
  radioButtons();
  checkbox();
  singleImage();
  multiImage();
  files();
  image({ userId: "a", userToken: "a", route: "a" });
  photo();
  buttonNext();
  buttonSubmit();
  doubleBackNext();
  doubleBackSubmit();

  submit?.addEventListener("click", () => {
    const currentParentWithBackSubmit =
      localStorage.getItem("pages") || PAGES_STRING;

    if ($title.textContent?.toLowerCase() === "click and change title") {
      title.textContent = null;
    } else {
      title.value = $title.textContent || "";
    }

    $description.value = $descriptionForm.value;
    sendDivision.value = $selectDivision.value;
    inputs.value = currentParentWithBackSubmit;
  });
})();
