class Message {
  constructor(text, context) {
    this.text = text;
    this.context = context;
  }

  draw() {
    this.context.font = '30px sans-serif';
    this.context.fillStyle = 'red';
    this.context.fillText(text, 0, 0);
  }
}

export default Message;
