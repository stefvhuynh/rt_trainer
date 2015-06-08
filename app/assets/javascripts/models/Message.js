class Message {
  constructor(context, text) {
    this.context = context;
    this.text = text;
  }

  draw() {
    this.context.font = '30px sans-serif';
    this.context.fillStyle = 'red';
    this.context.fillText(this.text, 0, 0);
  }
}

export default Message;
