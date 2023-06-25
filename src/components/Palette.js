
const DEFAULT_COLORS = ["#2c2c2c", "#fff", "#ff0077", "#ff4da0", "#ff8bae", "#ffd1dc", "#c1b0ff", "#b43ccc", "#db69fd"];
class Palette {
  constructor({ $target, colors, handleClick }) {
    this.$target = $target;
    this.colors = colors ? colors : DEFAULT_COLORS;
    this.handleClick = handleClick;
    this.$colors;

    this.render();
  }

  render = () => {
    this.settingInitial();
    this.$colors.map($color => {
      this.$target.appendChild($color);
    })
  }

  settingInitial = () => {
    this.$colors = this.colors.map((color, i) => {
      const $color = document.createElement("div");
      $color.className = "control_color jsColor";
      if(i === 0) $color.classList.add("active");
      $color.style.backgroundColor = color;
      $color.addEventListener("click", this.handleClick);
      return $color;
    })
  }

  getColors = () => {
    return this.$colors;
  }

  setColors = ($colors) => {
    this.$colors = $colors;
  }
}

export default Palette;