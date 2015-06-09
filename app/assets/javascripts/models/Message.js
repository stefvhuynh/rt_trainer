import CanvasUtils from 'utils/CanvasUtils';
import CanvasConstants from 'constants/CanvasConstants';
import Position from 'models/Position';

class Message {
  constructor(gameProps, text) {
    this.gameProps = gameProps;
    this.text = text;
    this.textColor = this._getTextColor(text);
  }

  draw() {
    const context = this.gameProps.get('context');
    const upperLeftPosition = this._getUpperLeftPosition();
    context.font = '30px sans-serif';
    context.fillStyle = this.textColor;
    context.fillText(this.text, upperLeftPosition.x, upperLeftPosition.y);
  }

  brieflyDisplay(time) {
    this.draw();
    setTimeout(() => CanvasUtils.clearCanvas(this.gameProps), time);
  }

  _getTextColor(text) {
    let textColor = CanvasConstants.BLACK;

    if (text === CanvasConstants.HIT) {
      textColor = CanvasConstants.GREEN;
    } else if (text === CanvasConstants.MISS) {
      textColor = CanvasConstants.RED;
    }

    return textColor;
  }

  _getUpperLeftPosition() {
    const boardSize = this.gameProps.get('boardSize');
    const x = boardSize.get('width') / 2 - 30;
    const y = boardSize.get('height') / 2 + 10;
    return new Position(x, y);
  }
}

export default Message;
