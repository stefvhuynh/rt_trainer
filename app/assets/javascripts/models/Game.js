import Position from 'models/Position';
import Target from 'models/Target';
import ReadyButton from 'models/ReadyButton';
import Message from 'models/Message';

class Game {
  constructor(context, boardSize) {
    this.context = context;
    this.boardSize = boardSize;
    this.currentTarget = this._generateReadyButton();
    this.inReadyPhase = true;
  }

  run() {
    this.currentTarget.draw();
  }

  clickOnBoard(position) {
    if (this.inReadyPhase && this.currentTarget.clickOn(position)) {
      this.currentTarget = this._generateTarget();
      this.currentTarget.randomlyAppear();
      this.inReadyPhase = false;
    } else if (this.currentTarget.clickOn(position)) {
      this.currentTarget = this._generateReadyButton();
      this.currentTarget.draw();
      this.inReadyPhase = true;
    }
  }

  _generateTarget() {
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

  _generateReadyButton() {
    return new ReadyButton(this.context, this.boardSize);
  }

  _generateMessage() {
    return new Message(this.context, 'MISS');
  }
}

Game.LARGE_TARGET_SIZE = 50;
Game.SMALL_TARGET_SIZE = 25;

export default Game;
