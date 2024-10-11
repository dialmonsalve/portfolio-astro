import { create } from "../components/dateDateTimeTextarea";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function date() {
  const $date = $("#date");
  let incrementId = 0;

  $date?.addEventListener("click", () => {
    incrementId++;
    create(incrementId, { object: "Date", type: "date", input: "INPUT" });
  });
}