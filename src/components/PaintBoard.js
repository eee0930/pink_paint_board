const LOCAL_NAME = "pinkpinkPaint";

class PaintBoard {
  constructor({ $target, defaultSetting, handleClickCanvas }) {
    this.$target = $target;
    this.defaultSetting = defaultSetting;
    this.handleClickCanvas = handleClickCanvas;
    this.$canvas = createElement("canvas", "canvas");
    this.ctx = this.$canvas.getContext("2d");
    this.isPainting = false;
    this.render();
  }

  render = () => {
    this.$target.appendChild(this.$canvas);
    this.settingInitial();
  }

  settingInitial = () => {
    this.settingCanvas();
    this.settingCtx();
    this.addEventListeners();
  }

  settingCanvas = () => {
    const { offsetWidth, offsetHeight } = this.$canvas;
    this.$canvas.width = offsetWidth;
    this.$canvas.height = offsetHeight;
  }

  settingCtx = () => {
    const localControl = localStorage.getItem(LOCAL_NAME);
    if(localControl) this.defaultSetting = JSON.parce(localControl);
    const { strokeStyle, lineWidth, fillStyle } = this.defaultSetting;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth;
    this.ctx.fillStyle = fillStyle;
  }

  addEventListeners = () => {
    this.$canvas.addEventListener("mousemove", this.onMouseMove);
    this.$canvas.addEventListener("mousedown", this.startPainting);
    this.$canvas.addEventListener("mouseup", this.stopPainting);
    this.$canvas.addEventListener("mouseleave", this.stopPainting);
    this.$canvas.addEventListener("click", this.handleClickCanvas);
    this.$canvas.addEventListener("contextmenu", this.handleCT);
  }

  onMouseMove = (event) => {
    const X = event.offsetX;
    const Y = event.offsetY;
    if(!this.isPainting) {
      this.ctx.beginPath();
      this.ctx.moveTo(X, Y);
    } else {
      this.ctx.lineTo(X, Y);
      this.ctx.stroke();
    }
  }

  startPainting = () => this.isPainting = true

  stopPainting = () => this.isPainting = false;

  handleCT = (event) => {
    event.preventDefault();
  }

  setCanvas = ($canvas) => {
    this.$canvas = $canvas;
  }

  getCanvas = () => {
    return this.$canvas;
  }

  getCtx = () => {
    return this.ctx;
  }
  
}

const createElement = (tagName, className) => {
  const $ele = document.createElement(tagName);
  if(className) {
    if(typeof className === "string") {
      $ele.className = className;
    } else {
      $ele.className = `${className.join(" ")}`;
    }
  }
  return $ele;
}

export default PaintBoard;