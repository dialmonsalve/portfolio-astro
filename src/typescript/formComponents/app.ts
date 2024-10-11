// import headings from "./inputs/headings";
import "./webComponents";
import buttonNext from "./inputs/buttonNext";
import buttonSubmit from "./inputs/buttonSubmit";
import checkbox from "./inputs/checkbox";
import createPages from './inputs/page'
import date from "./inputs/date";
import dateTime from "./inputs/dateTime";
import doubleBackNext from "./inputs/doubleBackNext";
import doubleBackSubmit from "./inputs/doubleBackSubmit";
import email from "./inputs/email";
import files from "./inputs/files";
import headings from './inputs/heading';
import image from "./inputs/image";
import multiImage from "./inputs/multiImage";
import number from "./inputs/number";
import paragraph from "./inputs/paragraph";
import password from "./inputs/password";
import phone from "./inputs/phone";
import radioButtons from "./inputs/radioButtons";
import select from "./inputs/select";
import signature from "./inputs/signature";
import singleImage from "./inputs/singleImage";
import text from "./inputs/text";
import textArea from "./inputs/textarea";

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
