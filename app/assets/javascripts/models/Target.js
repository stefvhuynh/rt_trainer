import CanvasUtils from 'utils/CanvasUtils';

class Target {
  constructor(context, position, radius, boardSize) {
    this.context = context;
    this.position = position;
    this.radius = radius;
    this.boardSize = boardSize;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    this.context.fillStyle = '#000';
    this.context.fill();
  }

  clickOn(position) {
    if (this._wasClickedOn(position)) {
      CanvasUtils.clearCanvas(this.context, this.boardSize);
    }
  }

  randomlyAppear() {
    const randomTime = Math.random() * 5000;
    setTimeout(() => this.draw(), randomTime);
  }

  _wasClickedOn(mousePosition) {
    return CanvasUtils.getDistance(mousePosition, this.position) < this.radius;
  }
}

export default Target;
