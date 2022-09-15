'use strict';

const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const openBtn = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      closeBtn = document.querySelector(closeSelector);

    openBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }
        modal.style.display = "block";
        document.body.classList.add("modal-open");

        if (modalTimer) {
          clearInterval(modalTimer);
        }
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
      }
    });
  }

  function showModalByTime(modalSelector, time) {
    const modalTimer = setTimeout(() => {
      document.querySelector(modalSelector).style.display = "block";
      document.body.classList.add("modal-open");
    }, time);
  }


  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );
  bindModal(".phone_link", ".popup", ".popup .popup_close");
  // showModalByTime(".popup", 5000);
};

export default modals;
