import Immutable from 'immutable';
import Position from 'models/Position';
import CanvasUtils from 'utils/CanvasUtils';

class ReadyButton {
  constructor(context, boardSize) {
    this.context = context;
    this.boardSize = boardSize;
  }

  draw() {
    this._drawBackground();
    this._drawText();
  }

  clickOn(position) {
    if (this._wasClickedOn(position)) {
      CanvasUtils.clearCanvas(this.context, this.boardSize);
      return true;
    }

    return false;
  }

  _wasClickedOn(position) {
    const area = this._getButtonArea();
    const isWithinWidth = position.x > area.get('upperLeft').get('x') &&
      position.x < area.get('bottomRight').get('x');
    const isWithinHeight = position.y > area.get('upperLeft').get('y') &&
      position.y < area.get('bottomRight').get('y');

    return isWithinWidth && isWithinHeight;
  }

  _drawText() {
    const coordinates = this._getUpperLeftCoordinates();

    this.context.font = '14px sans-serif';
    this.context.fillStyle = '#fff';
    this.context.fillText(
      'Click here when',
      coordinates.get('x') + 5,
      coordinates.get('y') + 22
    );
    this.context.fillText(
      'you\'re ready',
      coordinates.get('x') + 17,
      coordinates.get('y') + 38
    );
  }

  _drawBackground() {
    CanvasUtils.drawRectangle(
      this._getUpperLeftPosition(),
      this.constructor.BUTTON_WIDTH,
      this.constructor.BUTTON_HEIGHT,
      CanvasConstants.GREEN,
      CanvasConstants.DARK_GREEN
    );
  }

  _getUpperLeftPosition() {
    const halfWidth = this.boardSize.get('width') / 2;
    const halfHeight = this.boardSize.get('height') / 2;
    const x = halfWidth - this.constructor.BUTTON_WIDTH / 2;
    const y = halfHeight - this.constructor.BUTTON_HEIGHT / 2;
    return new Position(x, y);
  }

  _getButtonArea() {
    const upperLeft = this._getUpperLeftPosition();
    const bottomRight = new Position(
      upperLeft.x + this.constructor.BUTTON_WIDTH,
      upperLeft.y + this.constructor.BUTTON_HEIGHT
    );
    return Immutable.Map({ upperLeft, bottomRight });
  }
}

ReadyButton.BUTTON_WIDTH = 110;
ReadyButton.BUTTON_HEIGHT = 50;

export default ReadyButton;
