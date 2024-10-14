// import headings from "./inputs/headings";
import "./webComponents/index.js";
import buttonNext from "./inputs/buttonNext.js";
import buttonSubmit from "./inputs/buttonSubmit.js";
import checkbox from "./inputs/checkbox.js";
import createPages from './inputs/page.js'
import date from "./inputs/date.js";
import dateTime from "./inputs/dateTime.js";
import doubleBackNext from "./inputs/doubleBackNext.js";
import doubleBackSubmit from "./inputs/doubleBackSubmit.js";
import email from "./inputs/email.js";
import files from "./inputs/files.js";
import headings from './inputs/heading.js';
import image from "./inputs/image.js";
import multiImage from "./inputs/multiImage.js";
import number from "./inputs/number.js";
import paragraph from "./inputs/paragraph.js";
import password from "./inputs/password.js";
import phone from "./inputs/phone.js";
import radioButtons from "./inputs/radioButtons.js";
import select from "./inputs/select.js";
import signature from "./inputs/signature.js";
import singleImage from "./inputs/singleImage.js";
import text from "./inputs/text.js";
import textArea from "./inputs/textarea.js";

import storage from "./utils/saveAtLocalStorage.js";

function app() {
  const $ = (selector: string) => document.querySelector(selector);

  const userId = $("#userId")?.value;
  const userToken = $("#userToken")?.value;
  const route = $("#route")?.value;

  const $buttonCreateForm = $("#create-form");

  const pages = JSON.parse(
    '[{ "page": "Container", "id": "card-1", "inputs": [] }]'
  );

  storage.saveAtLocalStorage(pages);

  createPages();
  headings();
  paragraph();
  text();
  email();
  phone();
  number();
  password();
  date();
  dateTime();
  textArea();
  checkbox();
  signature();
  select();
  radioButtons();
  singleImage();
  multiImage();
  files();
  image({ userId, userToken, route });
  buttonNext();
  buttonSubmit();
  doubleBackNext();
  doubleBackSubmit();


  $buttonCreateForm?.addEventListener("click", function () {

  });
}

app();
