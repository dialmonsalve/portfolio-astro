import { create } from "../components/images";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

interface Image {
  userId: string;
  userToken: string;
  route: string
}

export default function image({ userId, userToken, route }: Image) {
  const $singleImage = $("#image");
  let incrementId = 0;

  $singleImage?.addEventListener("click", () => {
    incrementId++;
    create(incrementId, {
      showPhoto: true,
      userId,
      userToken,
      route,
      object: "Image",
      stringId: "image",
    });
  });
}