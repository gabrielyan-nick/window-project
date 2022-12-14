const scrolling = (selector) => {
  const upArrow = document.querySelector(selector);

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1650) {
      upArrow.classList.add("animated", "fadeIn");
      upArrow.classList.remove("fadeOut");
    } else {
      upArrow.classList.remove("fadeIn");
      upArrow.classList.add("fadeOut");
    }
  });

  // Scrolling with requestAnimationFrame.

  let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.2;

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      let widthTop = Math.round(
          document.body.scrollTop || document.documentElement.scrollTop
        ),
        hash = this.hash,
        toBlock = document.querySelector(hash).getBoundingClientRect().top,
        start = null;

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
          r =
            toBlock < 0
              ? Math.max(widthTop - progress / speed, widthTop + toBlock)
              : Math.min(widthTop + progress / speed, widthTop + toBlock);

        document.documentElement.scrollTo(0, r);

        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });
};

export default scrolling;
