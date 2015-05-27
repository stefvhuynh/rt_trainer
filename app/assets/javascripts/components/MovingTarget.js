import React from 'react';

class MovingTarget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      height: '100px', width: '100px', background: 'red', borderRadius: '100px'
    };

    return(
      <div className="MovingTarget" style={ style }/>
    );
  }
}

export default MovingTarget;
