import Immutable from 'immutable';
import Position from 'models/Position';
import CanvasUtils from 'utils/CanvasUtils';
import CanvasConstants from 'constants/CanvasConstants';

class ReadyButton {
  constructor(gameProps) {
    this.gameProps = gameProps;
  }

  draw() {
    this._drawBackground();
    this._drawText();
  }

  clickOn(position) {
    if (this._wasClickedOn(position)) {
      CanvasUtils.clearCanvas(this.gameProps);
      return true;
    }

    return false;
  }

  _wasClickedOn(position) {
    const area = this._getButtonArea();
    const isWithinWidth = position.x > area.get('upperLeft').x &&
      position.x < area.get('bottomRight').x;
    const isWithinHeight = position.y > area.get('upperLeft').y &&
      position.y < area.get('bottomRight').y;

    return isWithinWidth && isWithinHeight;
  }

  _drawBackground() {
    const buttonSize = Immutable.Map({
      width: this.constructor.BUTTON_WIDTH,
      height: this.constructor.BUTTON_HEIGHT
    });

    CanvasUtils.drawRectangle(
      this.gameProps,
      this._getUpperLeftPosition(),
      buttonSize,
      CanvasConstants.GREEN,
      CanvasConstants.DARK_GREEN
    );
  }

  _drawText() {
    const position = this._getUpperLeftPosition();
    const context = this.gameProps.get('context');

    context.font = '14px sans-serif';
    context.fillStyle = '#fff';
    context.fillText(
      'Click here when',
      position.x + 5,
      position.y + 22
    );
    context.fillText(
      'you\'re ready',
      position.x + 17,
      position.y + 38
    );
  }

  _getUpperLeftPosition() {
    const boardSize = this.gameProps.get('boardSize');
    const halfWidth = boardSize.get('width') / 2;
    const halfHeight = boardSize.get('height') / 2;
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
