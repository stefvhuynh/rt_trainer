import Immutable from 'immutable';

class StartButton {
  constructor(boardSize, context) {
    this.boardSize = boardSize;
    this.context = context;
    this.buttonSize = Immutable.Map({ width: 110, height: 50 });
    this.clickedOn = false;
  }

  draw() {
    this._drawBackground();
    this._drawText();
  }

  clickOn(position) {
    if (this._wasClickedOn(position)) {
      this.context.clearRect(
        0,
        0,
        this.boardSize.get('width'),
        this.boardSize.get('height')
      );

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
    const coordinates = this._getUpperLeftCoordinates();

    this.context.rect(
      coordinates.get('x'),
      coordinates.get('y'),
      this.buttonSize.get('width'),
      this.buttonSize.get('height')
    );

    this.context.fillStyle = '#449d44';
    this.context.fill();
    this.context.strokeStyle = '#398439';
    this.context.stroke();
  }

  _getUpperLeftCoordinates() {
    const halfWidth = this.boardSize.get('width') / 2;
    const halfHeight = this.boardSize.get('height') / 2;
    const x = halfWidth - this.buttonSize.get('width') / 2;
    const y = halfHeight - this.buttonSize.get('height') / 2;
    return Immutable.Map({ x, y });
  }

  _getButtonArea() {
    const upperLeft = this._getUpperLeftCoordinates();
    const bottomRight = Immutable.Map({
      x: upperLeft.get('x') + this.buttonSize.get('width'),
      y: upperLeft.get('y') + this.buttonSize.get('height')
    });
    return Immutable.Map({ upperLeft, bottomRight });
  }
}

export default StartButton;
