class Controllers {
  constructor({ $target }) {
    this.$target = $target;
    this.isFilling = false;
  }

  getIsFilling = () => {
    return this.isFilling;
  }
}

export default Controllers;