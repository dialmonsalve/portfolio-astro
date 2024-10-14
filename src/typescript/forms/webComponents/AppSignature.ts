
export default class AppSignature extends HTMLElement {
  private _value: string;
  private label: string;
  private initialX: number;
  private initialY: number;
  private context: CanvasRenderingContext2D;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    this._value = '';
    this.label = '';

    const link = document.createElement('LINK') as HTMLLinkElement;
    const $paragraph = document.createElement("P") as HTMLParagraphElement;
    const $containerCanvas = document.createElement("DIV") as HTMLDivElement;
    const $canvas = document.createElement("CANVAS") as HTMLCanvasElement;
    const $button = document.createElement("BUTTON") as HTMLButtonElement;

    link.rel = 'stylesheet';
    link.href = new URL('./styles/signature.css', import.meta.url).href;

    $paragraph.textContent = this.label;

    $canvas.id = 'signature'
    this.context = $canvas.getContext("2d") as CanvasRenderingContext2D;
    this.initialX = 0;
    this.initialY = 0;

    $button.id = 'clear';
    $button.textContent = 'clear';
    $button.addEventListener('click', this.clearCanvas)

    shadow.appendChild(link);

    this.id = 'app-signature'

    $containerCanvas.appendChild($canvas);

    this.shadowRoot?.appendChild($paragraph);
    this.shadowRoot?.appendChild($containerCanvas);
    this.shadowRoot?.appendChild($button);

    const breakpoint = 432;
    $canvas.height = 150;

    if (window.innerWidth > breakpoint) {
      $canvas.width = 400;
    } else {
      $canvas.width = 250;
    }

    this.draw(this.initialX, this.initialY);
  }

  connectedCallback() {
    const $canvas = this.shadowRoot?.querySelector('canvas') as HTMLCanvasElement;
    const encode = $canvas.toDataURL("image/png");
    let isDrawing = false;

    $canvas?.addEventListener("mousedown", (evt) => {
      isDrawing = true;
      this.mouseDown(evt);
    });

    $canvas?.addEventListener("mouseup", () => {
      isDrawing = false;
      this._value = encode;
      this.mouseUp();
    });

    $canvas?.addEventListener("touchstart", (evt) => {
      isDrawing = true;
      this.touchStart(evt);
    });

    $canvas?.addEventListener("touchend", () => {
      isDrawing = false;
      this._value = encode;
    });

    $canvas?.addEventListener('mousemove', (event) => {
      if (isDrawing) {
        this.draw(event.offsetX, event.offsetY);
      }
    });
  }

  draw = (cursorX: number, cursorY: number) => {
    this.context.beginPath();
    this.context.moveTo(this.initialX, this.initialY);
    this.context.lineWidth = 2;
    this.context.strokeStyle = "#000";
    this.context.lineCap = "round";
    this.context.lineJoin = "miter";
    this.context.lineTo(cursorX, cursorY);
    this.context.stroke();
    this.context.shadowColor = "#2e2e2e";
    this.context.shadowBlur = 1;
    this.initialX = cursorX;
    this.initialY = cursorY;
  }

  mouseDown = (evt: MouseEvent) => {
    const $canvas = this.shadowRoot?.querySelector('canvas');
    this.initialX = evt.offsetX;
    this.initialY = evt.offsetY;
    this.draw(this.initialX, this.initialY);
    $canvas?.addEventListener("mousemove", this.mouseMoving);
  }

  touchStart = (evt: TouchEvent) => {
    const $canvas = this.shadowRoot?.querySelector('canvas');
    const touchPosition = this.getTouchPosition(evt);
    this.initialX = touchPosition.x;
    this.initialY = touchPosition.y;
    this.draw(this.initialX, this.initialY);
    $canvas?.addEventListener("touchmove", this.touchMoving);
  }

  touchMoving = (evt: TouchEvent) => {
    evt.preventDefault();
    const touchPosition = this.getTouchPosition(evt);
    this.draw(touchPosition.x, touchPosition.y);
  }

  getTouchPosition = (event: TouchEvent) => {
    const $canvas = this.shadowRoot?.querySelector('canvas') as HTMLCanvasElement;
    const rect = $canvas.getBoundingClientRect();
    const touch = event.changedTouches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  }

  mouseMoving = (evt: MouseEvent) => {
    this.draw(evt.offsetX, evt.offsetY);
  }

  mouseUp = () => {
    const $canvas = this.shadowRoot?.querySelector('canvas') as HTMLCanvasElement;
    $canvas?.removeEventListener("mousemove", this.mouseMoving);
  }

  clearCanvas = () => {
    const $canvas = this.shadowRoot?.querySelector('canvas') as HTMLCanvasElement;
    if (this.context) {
      this.context.clearRect(0, 0, $canvas.width, $canvas.height);
      this._value = '';
    }
  }

  attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
    this._value = newValue;
  }

  static get observedAttributes() {
    return ['value']
  }

  get value(): string {
    return this._value;
  }

}

customElements.define("app-signature", AppSignature);