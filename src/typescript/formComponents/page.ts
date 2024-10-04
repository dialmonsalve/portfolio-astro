import button from "./components/button";

const parentCards: HTMLDivElement | null = document.querySelector('#container-cards');

let allPages = [{ page: 'Container', id: 'card-1', inputs: [] }]

export default function pages() {
  let incrementId = 1;
  const buttonAddPage: HTMLButtonElement | null = document.querySelector('#button-add-page');
  buttonAddPage?.addEventListener('click', (evt) => add(evt, incrementId));
}

function add(evt: MouseEvent, incrementId: number) {
  incrementId++;
  const page = document.createElement('DIV');
  const target = evt.target as HTMLElement;

  const buttonAdd = button({
    text: "add-page",
    spanClass: "button-square-add",
    buttonClass: 'card__button-add',
    id: 'add-page'
  },
    (evt) => add(evt, incrementId))

  const buttonDelete = button({
    id: `remove-page-${incrementId}`,
    text: "remove-page",
    spanClass: "button-square-remove",
    buttonClass: 'card__button-remove'
  },
    (evt) => remove(evt, incrementId))

  page.classList.add('container-card-form', 'card');
  page.id = `card-${incrementId}`;

  page.appendChild(buttonAdd);
  page.appendChild(buttonDelete);

  parentCards?.appendChild(page);

  const newPage = { page: 'Container', id: page.id, inputs: [] };
  allPages = [...allPages, newPage];

  if (target.classList.contains('button-square-add')) {
    const parentDiv = target.parentElement;
    parentDiv?.remove();
  }

  target.remove();

  return allPages;
}

function remove(evt: MouseEvent, incrementId: number) {
  incrementId++;
  const target = evt.target as HTMLElement;
  const parentDiv = target.closest('.container-card-form');
  const previousCard = parentCards?.querySelector('.container-card-form.card:nth-last-child(2)');

  if (!parentDiv) return;

  const isLastCard = parentDiv === parentCards?.lastElementChild;

  const buttonAdd = button({
    text: "add-page",
    spanClass: "button-square-add",
    buttonClass: 'card__button-add',
    id: 'add-page'
  },
    (evt) => add(evt, incrementId))

  if (parentCards?.childElementCount === 2) {
    previousCard?.appendChild(buttonAdd);
    parentDiv?.remove()
  } else if (isLastCard) {
    previousCard?.appendChild(buttonAdd);
    parentDiv?.remove()
  } else {
    parentDiv?.remove()
  }

  const filterPages = allPages.filter(page => page.id !== parentDiv.id)

  console.log(filterPages);


}