export function downloadImage() {
  const $img = document.querySelector("#converted-image") as HTMLImageElement;
  const $link = document.createElement("a");

  if (!$img) return;
  const name = $img.getAttribute("data-name");
  $link.href = $img?.src;
  if (!name) return;
  $link.download = name;
  $link.click();
}
