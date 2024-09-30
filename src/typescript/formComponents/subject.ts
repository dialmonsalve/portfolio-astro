import type { InputSubject } from "./inputs";

interface Observer {
  notify: (subject: InputSubject) => void;
}

export class Subject {
  observer: Observer[];
  constructor() {
    this.observer = [];
  }

  subscribe(observer: Observer) {
    this.observer.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observer = this.observer.filter((element) => element !== observer);
  }

  notify(obj: InputSubject) {
    this.observer.forEach((obs) => {
      obs.notify(obj);
    });
  }
}
