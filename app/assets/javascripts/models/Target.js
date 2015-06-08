import CanvasUtils from 'utils/CanvasUtils';
import CanvasConstants from 'constants/CanvasConstants';

class Target {
  constructor(context, position, radius, boardSize) {
    this.context = context;
    this.position = position;
    this.radius = radius;
    this.boardSize = boardSize;
  }

  draw() {
    CanvasUtils.drawCircle(this.position, this.radius, CanvasConstants.BLACK);
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
