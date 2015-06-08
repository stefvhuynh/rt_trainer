const CanvasUtils = {
  clearCanvas(context, boardSize) {
    context.clearRect(0, 0, boardSize.get('width'), boardSize.get('height'));
  },

  getDistance(firstPosition, secondPosition) {
    const xDist = (firstPosition.x - secondPosition.x) ** 2;
    const yDist = (firstPosition.y - secondPosition.y) ** 2;
    return Math.sqrt(xDist + yDist);
  }
};

export default CanvasUtils;
