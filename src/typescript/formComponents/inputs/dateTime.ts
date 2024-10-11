import { create } from "../components/dateDateTimeTextarea";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function dateTime() {
  const $dateTime = $("#date-time");
  let incrementId = 0;

  $dateTime?.addEventListener("click", () => {
    incrementId++;
    create(incrementId, { object: "DateTime", type: "time", input: "INPUT" });
  });
}