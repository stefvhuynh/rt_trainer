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

  reset() {
    this.startTime = null;
    this.times = [];
  }

  calculateAverageTime() {
    const sum = this.times.reduce((accumulator, value) => accumulator + value);
    return sum / this.times.length;
  }
}

export default Timer;
