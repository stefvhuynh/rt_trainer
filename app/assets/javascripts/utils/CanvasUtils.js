const CanvasUtils = {
  clearCanvas(context, boardSize) {
    context.clearRect(0, 0, boardSize.get('width'), boardSize.get('height'));
  },

  drawCircle(context, centerPosition, radius, fillStyle, strokeStyle) {
    context.beginPath();
    context.arc(
      centerPosition.x,
      centerPosition.y,
      radius,
      0,
      2 * Math.PI,
      false
    );
    this._fillAndStroke(context, fillStyle, strokeStyle);
  },

  drawRectangle(context, upperLeftPosition, size, fillStyle, strokeStyle) {
    context.beginPath();
    context.rect(
      upperLeftPosition.x,
      upperLeftPosition.y,
      size.get('width'),
      size.get('height')
    );
    this._fillAndStroke(context, fillStyle, strokeStyle);
  },

  _fillAndStroke(context, fillStyle, strokeStyle) {
    context.fillStyle = fillStyle;
    context.fill();
    context.strokeStyle = strokeStyle;
    context.stroke();
  }
};

export default CanvasUtils;
