const refs = {
  days: document.querySelector("span[data-value='days']"),
  hours: document.querySelector("span[data-value='hours']"),
  mins: document.querySelector("span[data-value='mins']"),
  secs: document.querySelector("span[data-value='secs']"),
};

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
    this.start = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = this.targetDate - currentDate;
      const time = this.getTime(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  getTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
}

function updateTimer({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("August 8, 2021"),
  onTick: updateTimer,
});
