import { create } from "../inputs/images";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function photo() {
  const $photo = $("#photo");
  let incrementId = 0;

  $photo?.addEventListener("click", () => {
    incrementId++;

    create({
      incrementId,
      showPhoto: false,
      stringId: "photo",
      takePicture: true,
    });
    smooth();
  });
}
