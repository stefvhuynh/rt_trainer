import React from 'react';
import Immutable from 'immutable';
import Game from 'models/Game';
import Position from 'models/Position';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.boardSize = Immutable.Map({ width: 500, height: 500 });
  }

  componentDidMount() {
    const canvas = this.refs['game-canvas'].getDOMNode();
    const context = canvas.getContext('2d');
    this.game = new Game(context, this.boardSize);
    this.game.run();
  }

  render() {
    return(
      <div className="Board">
        <canvas width={ this.boardSize.get('width') }
          height={ this.boardSize.get('height') }
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

export default Board;
