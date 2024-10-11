export interface Page {
  page: string;
  id: string;
  inputs: Inputs[]
}

export interface Inputs {
  id: string;
  object: string;
  name: string;
  label: string ;
  required?: boolean;
  disposition?: string;
  options?: string[];
  heading?: string
}
