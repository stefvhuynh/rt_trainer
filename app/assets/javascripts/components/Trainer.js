import React from 'react';
import Board from 'components/board';

class Trainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <main className="Trainer">
        <h1>Trainer</h1>
        <Board/>
      </main>
    );
  }
}

export default Trainer;
