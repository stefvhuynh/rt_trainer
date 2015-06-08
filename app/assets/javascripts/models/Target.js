import Position from 'models/Position';
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
    CanvasUtils.drawCircle(
      this.context,
      this.position,
      this.radius,
      CanvasConstants.BLACK
    );
  }

  clickOn(position) {
    if (this._wasClickedOn(position)) {
      CanvasUtils.clearCanvas(this.context, this.boardSize);
    }
  }

  randomlyAppear() {
    const randomTime = Math.random() * this.constructor.DELAY_LIMIT;
    setTimeout(() => this.draw(), randomTime);
  }

  _wasClickedOn(mousePosition) {
    return(
      Position.calculateDistance(mousePosition, this.position) < this.radius
    );
  }
}

Target.DELAY_LIMIT = 5000;

export default Target;
