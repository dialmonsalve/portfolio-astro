export interface Page {
  page: string;
  id: string;
  buttonIdUpdate: string | null;
  inputs: Inputs[];
  buttonIdRemove: string;
  containerId: string;
  containerPosition: number;
}

export interface Inputs {
  buttonIdRemove: string;
  buttonIdUpdate: string | null;
  containerId: string;
  id: string;
  name?: string;
  object: Objects
  accept?: string | null,
  class?: string | null,
  disposition?: 'row' | 'column',
  label?: string | null;
  multiple?: string | null,
  options?: ButtonOptions[] | null
  required?: boolean;
}

export type RestUpdate = RestUpdateInput;

type Objects =
  "Checkbox" | "Date" | "DateTime" |
  "Textarea" | 'NavigationButtons' |
  "Files" | "Heading" | "Image" |
  "SingleImage" | "MultiImage" |
  "Paragraph" | "RadioButton" | "Select" | "Signature" |
  "Text" | "Email" | "Phone" | "Password" | "Number"

interface ButtonOptions {
  name: string,
  type: "button" | "submit",
  id: string,
  label: "Back" | "Next" | "Submit",
  style: string | null,
}

interface RestUpdateInput {
  label?: string | null;
  heading?: string;
  name?: string;
  required?: boolean
  alt?: string,
  src?: string,
}

