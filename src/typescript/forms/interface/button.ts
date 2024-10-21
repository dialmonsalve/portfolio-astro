export interface IButton {
  text: string;
  buttonId: string;
  spanClass: string;
  buttonClass: string;
  get create(): HTMLButtonElement;
  action: (fn: (evt: MouseEvent) => void) => void
}
