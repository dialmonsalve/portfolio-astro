interface Button {
  incrementId: number;
  type: 'add' | 'update' | 'remove';
}

export default function button({ incrementId, type }: Button, fn: (evt: MouseEvent, incrementId: number) => void) {

  const button = document.createElement('BUTTON');

  const span = document.createElement('SPAN');

  const buttonText = document.createTextNode(`${type} page`);
  button.appendChild(buttonText);

  span.classList.add(`button-square-${type}`);
  button.classList.add(`card__button-${type}`);
  const id = type === 'add' ? `button-${type}-page` : `button-${type}-page-${incrementId}`;
  button.id = id;
  button.appendChild(span);

  button.addEventListener("click", (evt) => fn(evt, incrementId));

  return button;
}