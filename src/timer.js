export class Timer {
  constructor() {
    this.time = 0;
    this.interval_id = null;
  }
  start() {
    this.interval_id = setInterval(() => {
      this.time++;
    }, 1000);
  }
  end() {
    clearInterval(this.interval_id);
  }
}
