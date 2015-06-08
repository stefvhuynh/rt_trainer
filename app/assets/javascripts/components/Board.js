import React from 'react';
import Immutable from 'immutable';
import Game from 'models/Game';
import Position from 'models/Position';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = this.refs['game-canvas'].getDOMNode();
    const context = canvas.getContext('2d');
    const boardSize = Immutable.Map({
      width: this.constructor.BOARD_WIDTH,
      height: this.constructor.BOARD_HEIGHT
    });

    this.game = new Game(context, boardSize);
    this.game.run();
  }

  render() {
    return(
      <div className="Board">
        <canvas width={ this.constructor.BOARD_WIDTH }
          height={ this.constructor.BOARD_HEIGHT }
          className="game-canvas" ref="game-canvas"
          onMouseDown={ this._onCanvasMouseDown() }/>
      </div>
    );
  }

  _onCanvasMouseDown() {
    const boundFn = event => {
      event.preventDefault();
      const mousePosition = this._getMousePosition(event.pageX, event.pageY);
      this.game.clickOnBoard(mousePosition);
    };

    return boundFn;
  }

  _getMousePosition(pageX, pageY) {
    const canvas = this.refs['game-canvas'].getDOMNode();
    return new Position(pageX - canvas.offsetLeft, pageY - canvas.offsetTop);
  }
}

Board.BOARD_WIDTH = 500;
Board.BOARD_HEIGHT = 500;

export default Board;
