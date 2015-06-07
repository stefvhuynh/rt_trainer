class Position {
  static generateRandomPosition(width, height) {
    const randomX = Math.random() * width;
    const randomY = Math.random() * height;
    return new Position(randomX, randomY);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Position;
