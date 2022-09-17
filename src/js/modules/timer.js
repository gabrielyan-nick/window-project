const timer = (timerSelector, deadline) => {
  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      min = Math.floor((t / (1000 * 60)) % 60),
      sec = Math.floor((t / 1000) % 60);

    return { total: t, days, hours, min, sec };
  };

  const addZero = (num) => {
    if (num < 10 && num >= 0) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setClock = (selector, endtime) => {
    const t = document.querySelector(selector),
      days = document.querySelector("#days"),
      hours = document.querySelector("#hours"),
      minutes = document.querySelector("#minutes"),
      seconds = document.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.min);
      seconds.innerHTML = addZero(t.sec);

      if (t.total <= 0) {
        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";

        clearInterval(timeInterval);
      }
    }
  };

  setClock(timerSelector, deadline);
};

export default timer;
