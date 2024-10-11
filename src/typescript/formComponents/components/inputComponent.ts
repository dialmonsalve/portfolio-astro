
interface InputComponent {
  name:string;
  type:string;
  label:string;
  id:string;
}

export default function inputComponent({name, type, label, id}: InputComponent){

  const $ContainerInput = document.createElement("app-input");

  $ContainerInput.setAttribute("name", name);
  $ContainerInput.setAttribute("type", type);
  $ContainerInput.setAttribute("label", label);
  $ContainerInput.setAttribute("input-id", name);
  $ContainerInput.id = id;

  return $ContainerInput;
}