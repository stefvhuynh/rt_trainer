import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = this.refs.canvas.getDOMNode();
    const context = canvas.getContext('2d');
  }

  render() {
    return(
      <div className="Board">
        <canvas width="500" height="500" ref="canvas"/>
      </div>
    );
  }
}

export default Board;
