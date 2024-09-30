import type { InputSubject } from "./inputs";

interface Observer {
  notify: (subject: InputSubject) => void;
}

export class ListObserver implements Observer {
  notify(subject: InputSubject) {
    subject.inputs.forEach((element) => {
      console.log(element);
    });
  }
}

export class TotalObserver implements Observer {
  notify(subject: InputSubject) {
    console.log("total");
    console.log(
      subject.inputs.reduce((acc, current) => acc + current.amount, 0),
    );
  }
}
