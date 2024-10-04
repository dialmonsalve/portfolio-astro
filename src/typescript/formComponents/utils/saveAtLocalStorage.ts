import { PAGES_STRING } from "../const";
import type { Page } from "../interface";

const saveAtLocalStorage = (pages: Page[]) =>
    localStorage.setItem("pages", JSON.stringify(pages) || PAGES_STRING ) ;

export default saveAtLocalStorage;
