class Target {
  constructor(position, radius, context) {
    this.position = position;
    this.radius = radius;
    this.context = context;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    this.context.fillStyle = '#000';
    this.context.fill();
  }

  randomlyAppear() {
    const randomTime = Math.random() * 5000;
    setTimeout(() => this.draw(), randomTime);
  }
}

export default Target;
