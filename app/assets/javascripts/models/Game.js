import Position from 'models/Position';
import Target from 'models/Target';
import ReadyButton from 'models/ReadyButton';

class Game {
  constructor(context, boardSize) {
    this.context = context;
    this.boardSize = boardSize;
    this.currentTarget = this.generateReadyButton();
    this.inReadyPhase = true;
  }

  run() {
    this.currentTarget.draw();
  }

  clickOnBoard(position) {
    if (this.inReadyPhase && this.currentTarget.clickOn(position)) {
      this.currentTarget = this.generateTarget();
      this.currentTarget.randomlyAppear();
      this.inReadyPhase = false;
    } else if (this.currentTarget.clickOn(position)) {
      this.currentTarget = this.generateReadyButton();
      this.currentTarget.draw();
      this.inReadyPhase = true;
    }
  }

  generateTarget() {
    const position = Position.generateRandomPosition(
      this.boardSize.get('width'),
      this.boardSize.get('height'),
      this.constructor.LARGE_TARGET_SIZE
    );

    return new Target(
      this.context,
      position,
      this.constructor.LARGE_TARGET_SIZE,
      this.boardSize
    );
  }

  generateReadyButton() {
    return new ReadyButton(this.context, this.boardSize);
  }
}

Game.LARGE_TARGET_SIZE = 50;
Game.SMALL_TARGET_SIZE = 25;

export default Game;
