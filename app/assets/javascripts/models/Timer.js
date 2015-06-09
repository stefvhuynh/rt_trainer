class Timer {
  constructor() {
    this.startTime;
    this.times = [];
  }

  start() {
    this.startTime = Date.now();
    return this.startTime;
  }

  end() {
    const endTime = Date.now();
    this.times.push(endTime - this.startTime);
    return endTime;
  }
}

export default Timer;
