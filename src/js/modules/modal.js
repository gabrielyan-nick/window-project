"use strict";

const modals = (state) => {
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true
  ) {
    const openBtn = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      closeBtn = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");

    openBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        windows.forEach((item) => {
          item.style.display = "none";
        });

        modal.style.display = "block";
        document.body.classList.add("modal-open");

        // if (modalTimer) {
        //   clearInterval(modalTimer);
        // }
      });
    });

    closeBtn.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach((item) => {
          item.style.display = "none";
        });
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

  // function modalValidator(state, modalSelector, nextModalSelector, btnSelector, ...data) {
  //   document.querySelector(btnSelector).addEventListener("click", () => {
  //     if (!Object.keys(state).includes(...data)) {
  //       document.querySelector(modalSelector).style.display = 'block';
  //       document.querySelector(nextModalSelector).style.display = 'none';
  //     }
  //   });
  // }

  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );
  bindModal(".phone_link", ".popup", ".popup .popup_close");
  bindModal(".glazing_price_btn", ".popup_calc", ".popup_calc_close");
  bindModal(
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false
  );
  bindModal(
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false
  );
  // modalValidator(state, ".popup_calc", ".popup_calc_profile", '.popup_calc_button', 'form', 'width', 'height');
  // showModalByTime(".popup", 5000);
};

export default modals;

