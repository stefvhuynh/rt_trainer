import Position from 'models/Position';
import Target from 'models/Target';
import StartButton from 'models/StartButton';

class Game {
  constructor(boardSize, context) {
    this.boardSize = boardSize;
    this.context = context;
    this.currentTarget = this.generateStartButton();
    this.inReadyPhase = true;
  }

  run() {
    this.currentTarget.draw();
  }

  clickOnTarget(position) {
    if (this.inReadyPhase && this.currentTarget.clickOn(position)) {
      this.currentTarget = this.generateTarget();
      this.currentTarget.randomlyAppear();
    }
  }

  generateTarget() {
    const position = Position.generateRandomPosition(
      this.boardSize.get('width'),
      this.boardSize.get('height'),
      this.constructor.LARGE_TARGET_SIZE
    );

    return(
      new Target(position, this.constructor.LARGE_TARGET_SIZE, this.context)
    );
  }

  generateStartButton() {
    return new StartButton(this.boardSize, this.context);
  }
}

Game.LARGE_TARGET_SIZE = 50;
Game.SMALL_TARGET_SIZE = 25;

export default Game;
