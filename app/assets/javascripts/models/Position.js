class Position {
  static generateRandomPosition(width, height, buffer = 0) {
    const bufferedWidth = width - 2 * buffer;
    const bufferedHeight = height - 2 * buffer;

    const randomX = Math.random() * bufferedWidth + buffer;
    const randomY = Math.random() * bufferedHeight + buffer;
    return new Position(randomX, randomY);
  }

  static calculateDistance(firstPosition, secondPosition) {
    const xDist = (firstPosition.x - secondPosition.x);
    const yDist = (firstPosition.y - secondPosition.y);
    return Math.sqrt(xDist ** 2 + yDist ** 2);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Position;
