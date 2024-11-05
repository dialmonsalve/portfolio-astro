type Format = "png" | "jpeg" | "webp" | "jpg";

export function values() {
  const $selectFormat = document.querySelector(
    "#select-format",
  ) as HTMLSelectElement;
  const $selectQuality = document.querySelector(
    "#select-quality",
  ) as HTMLSelectElement;

  let format: Format = $selectFormat.value as Format;
  let quality: number = Number($selectQuality.value) / 100;

  $selectFormat?.addEventListener("change", (evt) => {
    const target = evt.target as HTMLSelectElement;
    format = target.value as Format;
  });

  $selectQuality?.addEventListener("change", (evt) => {
    const target = evt.target as HTMLSelectElement;
    quality = Number(target.value) / 100;
  });

  return {
    format,
    quality,
  };
}
