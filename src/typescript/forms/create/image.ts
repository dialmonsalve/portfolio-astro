import { create } from "../inputs/images";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

interface Image {
    userId: string;
    userToken: string;
    route: string;
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
            stringId: "image",
        });
        smooth()
    });
}
