import PaintBoard from "./components/PaintBoard.js";
import Palette from "./components/Palette.js";
import Controllers from "./components/Controllers.js";
import HandleSave from "./components/HandleSave.js";

const DEFAULT_CONTROL = {
  strokeStyle: "#2c2c2c", 
  lineWidth: 2.5, 
  fillStyle: "#2c2c2c",
};

class App {
  constructor($target) {
    this.$target = document.querySelector($target);
    this.$canvas;
    this.paintBoard;
    this.palette;
    this.controllers;
    this.handleSave;
    this.settingInitial();
  }

  settingInitial = () => {
    const $canvasContainer = this.settingPaintCanvas();
    const $controllerCover = this.settingControllers();
    const $saveBtn = this.settingSave();
    this.$target.append($canvasContainer, $controllerCover, $saveBtn);
  }

  settingPaintCanvas = () => {
    const $canvasContainer = createElement("div");
    this.paintBoard = new PaintBoard({
      $target: $canvasContainer,
      defaultSetting: DEFAULT_CONTROL,
      handleClickCanvas: this.handleClickCanvas,
    });
    this.$canvas = this.paintBoard.getCanvas();
    return $canvasContainer;
  }

  settingControllers = () => {
    const $controllerCover = createElement("div", "controls");
    const $controlOther = createElement("div");
    const $controlPalette = createElement("div", "controls_colors");
    $controllerCover.append($controlOther, $controlPalette);
    this.palette = new Palette({
      $target: $controlPalette,
      handleClick: this.handleClickColor,
    });
    this.controllers = new Controllers({
      $target: $controlOther,
      $canvas: this.$canvas,
    });
    return $controllerCover;
  }

  settingSave = () => {
    const $saveBtn = createElement("button", "save-btn");
    $saveBtn.id = "saveBtn";
    this.handleSave = new HandleSave({
      $btn: $saveBtn,
      $canvas: this.$canvas,
    });
    return $saveBtn;
  }

  handleClickCanvas = () => {
    const isFilling = this.controllers.getIsFilling();
    const ctx = this.paintBoard.getCtx();
    const { offsetWidth, offsetHeight } = this.$canvas;
    if(isFilling) {
      ctx.fillRect(0, 0, offsetWidth,  offsetHeight);
    }
  }

  handleClickColor = (event) => {
    const $colors = this.palette.getColors();
    Array.from($colors).forEach(
      color => color.classList.remove("active")
    );
    
    const color = event.target.style.backgroundColor;
    const ctx = this.paintBoard.getCtx();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    event.target.classList.add("active");
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

export default App;