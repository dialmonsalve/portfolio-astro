import { create } from "../components/number.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function phone() {
  const $number = $("#number");
  let incrementId = 0;

  $number?.addEventListener("click", () => {
    incrementId++;
    create(incrementId);
  });
}