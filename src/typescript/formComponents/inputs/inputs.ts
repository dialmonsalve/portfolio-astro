import { Subject } from "./subject";

interface Data {
  name: string;
  amount: number;
}

export class InputSubject extends Subject {
  inputs: Data[];

  constructor() {
    super();
    this.inputs = [];
  }

  next(data: Data): void {
    this.inputs.push(data);
    super.notify(this);
  }
}
