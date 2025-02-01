import "../../web-components";

import checkbox from "./checkbox";
import createPage from "./createPage";
import dateOrArea from "./dateDateTimeTextarea";
import files from "./files";
import headings from "./headings";
import input from "./textEmailPhonePassword";
import number from "./number";
import paragraph from "./paragraph";
import radioButtons from "./radioButtons";
import select from "./select";
import signature from "./signature";

import navigateInPage from "../utils/navigateInPage";

document.addEventListener('astro:page-load', ()=> {

  navigateInPage();
  createPage();
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
  checkbox();
  signature();
  select();
  radioButtons();
  files();
})
