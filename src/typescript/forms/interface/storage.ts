import type { Inputs, Page, RestUpdate } from "./";

export interface Storage {
  create: (lastChildren: HTMLElement, updateInputs: Inputs) => void;
  update: (target: HTMLButtonElement, rest: RestUpdate) => void;
  remove: (target: HTMLButtonElement) => void;
  saveAtLocalStorage: (pages: Page[]) => void;
}