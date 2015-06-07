import Position from 'models/Position';
import Target from 'models/Target';
import StartButton from 'models/StartButton';

class Game {
  constructor(boardSize, context) {
    this.boardSize = boardSize;
    this.context = context;
    this.currentTarget = this.generateStartButton();
  }

  run() {
    this.currentTarget.draw();
  }

  clickOnTarget(position) {
    this.currentTarget.clickOn(position);
  }

  generateTarget() {
    const position = Position.generateRandomPosition(
      this.boardSize.get('width'),
      this.boardSize.get('height')
    );
    return new Target(position, 20, this.context);
  }

  generateStartButton() {
    return new StartButton(this.boardSize, this.context);
  }
}

export default Game;
