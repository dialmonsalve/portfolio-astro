interface Button {
  text: string;
  id: string;
  spanClass: string;
  buttonClass: string;
}

export default function button(
  { text, id, spanClass, buttonClass }: Button,
  fn: (evt: MouseEvent) => void,
): HTMLButtonElement {

  const button = document.createElement("button");
  const span = document.createElement("span");

  const buttonText = document.createTextNode(text);

  button.id = id;
  button.classList.add(buttonClass);

  span.classList.add(spanClass);

  button.appendChild(buttonText);
  button.appendChild(span);

  button.addEventListener("click", fn);

  return button;
}
