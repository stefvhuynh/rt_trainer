import Position from 'models/Position';
import Target from 'models/Target';
import ReadyButton from 'models/ReadyButton';
import Message from 'models/Message';

class Game {
  constructor(gameProps) {
    this.gameProps = gameProps;
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
      this._generateMessage().brieflyDisplay(1000);
      setTimeout(() => {
        this.currentTarget = this._generateReadyButton();
        this.currentTarget.draw();
        this.inReadyPhase = true;
      }, 1000);
    }
  }

  _generateTarget() {
    const boardSize = this.gameProps.get('boardSize');
    const position = Position.generateRandomPosition(
      boardSize.get('width'),
      boardSize.get('height'),
      this.constructor.LARGE_TARGET_SIZE
    );

    return new Target(
      this.gameProps,
      position,
      this.constructor.LARGE_TARGET_SIZE
    );
  }

  _generateReadyButton() {
    return new ReadyButton(this.gameProps);
  }

  _generateMessage() {
    return new Message(this.gameProps, 'MISS');
  }
}

Game.LARGE_TARGET_SIZE = 50;
Game.SMALL_TARGET_SIZE = 25;

export default Game;
