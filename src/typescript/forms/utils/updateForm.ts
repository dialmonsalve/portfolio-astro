import type { Page } from "../interfaces";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $selectDivision = $("#header-select-division") as HTMLSelectElement;

export default async function (inputs: Page[]) {
  const $uuid = $("#formId") as HTMLInputElement;
  const uuid = $uuid.value;

  const $userToken = $(`#userToken`) as HTMLInputElement;
  const userToken = $userToken.value;

  const $userId = $("#userId") as HTMLInputElement;
  const userId = $userId.value;
  const url = `/api/admin/forms/${uuid}`;

  const $title = $("#main-form-title") as HTMLHeadingElement;
  const $descriptionForm = $("#description-form") as HTMLTextAreaElement;

  const title =
    $title.textContent?.trim() === "" ? "" : $title.textContent || "";
  const description =
    $descriptionForm.value.trim() === "" ? "" : $descriptionForm.value;
  const divisionId =
    $selectDivision.value === "" ? 1000 : Number($selectDivision.value);

  const form = {
    inputs,
    title,
    description,
    divisionId,
  };

  return await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "X-rain": userId,
      "Content-type": "Application/json",
    },
    body: JSON.stringify(form),
  });
}
