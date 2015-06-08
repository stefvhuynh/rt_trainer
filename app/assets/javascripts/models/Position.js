class Position {
  static generateRandomPosition(width, height, buffer = 0) {
    const bufferedWidth = width - 2 * buffer;
    const bufferedHeight = height - 2 * buffer;

    const randomX = Math.random() * bufferedWidth + buffer;
    const randomY = Math.random() * bufferedHeight + buffer;
    return new Position(randomX, randomY);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Position;
