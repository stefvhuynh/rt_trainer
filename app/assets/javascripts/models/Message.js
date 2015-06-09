import CanvasUtils from 'utils/CanvasUtils';

class Message {
  constructor(gameProps, text) {
    this.gameProps = gameProps;
    this.text = text;
  }

  draw() {
    const context = this.gameProps.get('context');
    context.font = '30px sans-serif';
    context.fillStyle = 'red';
    context.fillText(this.text, 100, 100);
  }

  brieflyDisplay(time) {
    this.draw();
    setTimeout(() => CanvasUtils.clearCanvas(this.gameProps), time);
  }
}

export default Message;
