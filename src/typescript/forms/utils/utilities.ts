
export const $ = (selector: string) => document.querySelector(selector);
export const $$ = (selector: string) => document.querySelectorAll(selector);

export const element = {
  create: <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K] =>
    document.createElement(tagName, options),

  textNode: (data: string) => document.createTextNode(data)
}
