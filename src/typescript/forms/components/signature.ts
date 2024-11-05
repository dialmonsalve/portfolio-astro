interface Signature {
  id: string;
  name: string;
  clear: string;
}
const $ = (selector: keyof HTMLElementTagNameMap | string) =>
  document.querySelector(selector);

export default function sign({ id, name, clear }: Signature) {
  const signCanvas = $(`#${id}`) as HTMLCanvasElement;
  const context = signCanvas.getContext("2d");
  const clearButtonSign = $(`#${clear}`) as HTMLButtonElement;
  const hidden = $(`#${name}`) as HTMLInputElement;
  clearButtonSign.addEventListener("click", clearCanvas);
  let initialX: number;
  let initialY: number;

  const breakpoint = 432;
  signCanvas.height = 150;

  if (window.innerWidth > breakpoint) {
    signCanvas.width = 400;
  } else {
    signCanvas.width = 200;
  }

  function draw(cursorX: number, cursorY: number) {
    if (!context) return;
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = 2;
    context.strokeStyle = "#000";
    context.lineCap = "round";
    context.lineJoin = "miter";
    context.lineTo(cursorX, cursorY);
    context.stroke();
    context.shadowColor = "#2e2e2e";
    context.shadowBlur = 1;
    initialX = cursorX;
    initialY = cursorY;
  }

  function mouseDown(evt: MouseEvent) {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
    draw(initialX, initialY);
    signCanvas.addEventListener("mousemove", mouseMoving);
  }

  function mouseMoving(evt: MouseEvent) {
    draw(evt.offsetX, evt.offsetY);
  }

  function mouseUp() {
    signCanvas.removeEventListener("mousemove", mouseMoving);
  }

  function touchStart(evt: TouchEvent) {
    const touchPosition = getTouchPosition(evt);
    initialX = touchPosition.x;
    initialY = touchPosition.y;
    draw(initialX, initialY);
    signCanvas.addEventListener("touchmove", touchMoving);
  }

  function touchMoving(evt: TouchEvent) {
    evt.preventDefault();
    const touchPosition = getTouchPosition(evt);
    draw(touchPosition.x, touchPosition.y);
  }

  function touchEnd() {
    signCanvas.removeEventListener("touchmove", touchMoving);
  }

  function getTouchPosition(event: TouchEvent) {
    const rect = signCanvas.getBoundingClientRect();
    const touch = event.changedTouches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  }

  signCanvas.addEventListener("mouseup", () => {
    hidden.value = signCanvas.toDataURL("image/png");
  });

  signCanvas.addEventListener("touchend", () => {
    hidden.value = signCanvas.toDataURL("image/png");
  });

  function clearCanvas() {
    if (context) {
      context.clearRect(0, 0, signCanvas.width, signCanvas.height);
      hidden.value = "";
    }
  }

  signCanvas.addEventListener("mousedown", mouseDown);
  signCanvas.addEventListener("mouseup", mouseUp);
  signCanvas.addEventListener("touchstart", touchStart);
  signCanvas.addEventListener("touchend", touchEnd);
}
