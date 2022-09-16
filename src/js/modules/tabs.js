"use strict";

const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
  const header = document.querySelector(headerSelector),
    tabs = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach((item) => {
      item.style.display = 'none';
    });

    tabs.forEach((item) => {
      try {
        item.querySelector(" a").classList.remove(activeClass);
      } catch {}

      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    content[i].style.display = 'block';
    try {
      tabs[i].querySelector(" a").classList.add(activeClass);
    } catch {}

    tabs[i].classList.add(activeClass);
  }

  header.addEventListener("click", (e) => {
    const target = e.target;

    if (
      target &&
      (target.classList.contains(tabSelector.replace(/\./, "")) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))
    ) {
      tabs.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();
};

export default tabs;
