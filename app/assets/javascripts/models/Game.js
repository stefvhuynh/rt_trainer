import Immutable from 'immutable';
import Position from 'models/Position';
import Target from 'models/Target';
import ReadyButton from 'models/ReadyButton';
import Message from 'models/Message';
import Timer from 'models/Timer';
import CanvasConstants from 'constants/CanvasConstants';

class Game {
  constructor(gameProps) {
    this.gameProps = gameProps;
    this.currentClickTarget = this._generateReadyButton();
    this.timer = new Timer();
    this.inReadyPhase = true;
    this.hits = 0;
    this.misses = 0;
    this.rounds = 5;
    this.trials = 20;
  }

  run() {
    this.currentClickTarget.draw();
  }

  getData() {
    return Immutable.Map({
      reactionTimes: this.timer.times,
      hits: this.hits,
      misses: this.misses
    });
  }

  clickOnBoard(position) {
    if (this.inReadyPhase) {
      if (this.currentClickTarget.clickOn(position)) {
        this._afterReadyButtonClick();
      }
    } else {
      if (this.currentClickTarget.clickOn(position)) {
        this._afterTargetClick();
      } else {
        this._afterTargetMiss();
      }
    }
  }

  _afterReadyButtonClick() {
    this.currentClickTarget = this._generateTarget();
    this.currentClickTarget.randomlyAppear(() => {
      this.inReadyPhase = false;
      this.timer.start()
    });
  }

  _afterTargetClick() {
    this.hits += 1;
    this.timer.end();
    this._displayMessageAndReadyButton(CanvasConstants.HIT);
  }

  _afterTargetMiss() {
    this.misses += 1;
    this._displayMessageAndReadyButton(CanvasConstants.MISS);
  }

  _displayMessageAndReadyButton(message) {
    const timeDelay = 1000; 
    this._generateMessage(message).brieflyDisplay(timeDelay);
    setTimeout(() => {
      this.currentClickTarget = this._generateReadyButton();
      this.currentClickTarget.draw();
      this.inReadyPhase = true;
      this.trials -= 1;
    }, timeDelay);
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

  _generateMessage(message) {
    return new Message(this.gameProps, message);
  }
}

Game.LARGE_TARGET_SIZE = 50;
Game.SMALL_TARGET_SIZE = 25;

export default Game;
