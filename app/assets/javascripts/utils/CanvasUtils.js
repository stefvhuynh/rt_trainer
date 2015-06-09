const CanvasUtils = {
  clearCanvas(gameProps) {
    const context = gameProps.get('context');
    const boardSize = gameProps.get('boardSize');
    context.clearRect(0, 0, boardSize.get('width'), boardSize.get('height'));
  },

  drawCircle(gameProps, centerPosition, radius, fillStyle, strokeStyle) {
    const context = gameProps.get('context');
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

  drawRectangle(gameProps, upperLeftPosition, size, fillStyle, strokeStyle) {
    const context = gameProps.get('context');
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
