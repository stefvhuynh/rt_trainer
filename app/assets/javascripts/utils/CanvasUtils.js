const CanvasUtils = {
  clearCanvas(context, boardSize) {
    context.clearRect(0, 0, boardSize.get('width'), boardSize.get('height'));
  },

  drawCircle(centerPosition, radius, fillColor, strokeColor) {
    this.context.beginPath();
    this.context.arc(
      centerPosition.x,
      centerPosition.y,
      radius,
      0,
      2 * Math.PI,
      false
    );
    this._fillAndStroke(fillColor, strokeColor);
  },

  drawRectangle(upperLeftPosition, width, height, fillColor, strokeColor) {
    this.context.rect(
      upperLeftPosition.x,
      upperLeftPosition.y,
      width,
      height
    );
    this._fillAndStroke(fillColor, strokeColor);
  },

  getDistance(firstPosition, secondPosition) {
    const xDist = (firstPosition.x - secondPosition.x) ** 2;
    const yDist = (firstPosition.y - secondPosition.y) ** 2;
    return Math.sqrt(xDist + yDist);
  },

  _fillAndStroke(fillColor, strokeColor) {
    this.context.fillStyle = fillColor;
    this.context.fill();
    this.context.strokeStyle = strokeStyle;
    this.context.stroke();
  }
};

export default CanvasUtils;
