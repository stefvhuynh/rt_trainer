import Position from 'models/Position';
import CanvasUtils from 'utils/CanvasUtils';
import CanvasConstants from 'constants/CanvasConstants';

class Target {
  constructor(gameProps, position, radius) {
    this.gameProps = gameProps;
    this.position = position;
    this.radius = radius;
  }

  draw() {
    CanvasUtils.drawCircle(
      this.gameProps,
      this.position,
      this.radius,
      CanvasConstants.BLACK
    );
  }

  clickOn(position) {
    CanvasUtils.clearCanvas(this.gameProps);
    return this._wasClickedOn(position);
  }

  randomlyAppear(callback) {
    const randomTime = Math.random() * this.constructor.DELAY_LIMIT;
    setTimeout(() => {
      this.draw();
      callback();
    }, randomTime);
  }

  _wasClickedOn(mousePosition) {
    return(
      Position.calculateDistance(mousePosition, this.position) < this.radius
    );
  }
}

Target.DELAY_LIMIT = 5000;

export default Target;
