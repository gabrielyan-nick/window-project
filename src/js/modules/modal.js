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
      windows = document.querySelectorAll("[data-modal]"),
      scroll = calcScroll();

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
        document.body.style.marginRight = `${scroll}px`;

        if (modalTimer) {
          clearInterval(modalTimer);
        }
      });
    });

    closeBtn.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      document.body.style.marginRight = "0px";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach((item) => {
          item.style.display = "none";
        });
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        document.body.style.marginRight = "0px";
      }
    });
  }

  document.querySelector(".popup_calc_button").addEventListener("click", () => {
    document.querySelectorAll(".whdata").forEach((item) => {
      item.value = "";
    });
  });

  function calcScroll() {
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";
    document.body.append(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  function modalValidator(
    state,
    modalSelector,
    nextModalSelector,
    btnSelector,
    ...data
  ) {
    const whInputs = document.querySelectorAll(".whdata"),
      btnNext = document.querySelector(btnSelector);
console.log(whInputs);
    whInputs.forEach((item) => {
      // Убираем красный бодер при вводе.
      item.addEventListener("input", (e) => {
        item.style.border = "";
      });
    });

    btnNext.addEventListener("click", () => {
      const dataArr = data;
      const arrState = Object.keys(state);

      if (state.width == "" || !state.width) {
        delete state.width;
        whInputs[0].style.border = "1px solid red";
      }
      if (state.height == "" || !state.height) {
        delete state.height;
        whInputs[1].style.border = "1px solid red";
      }

      let arrEqual = dataArr.every((item) => {
        if (arrState.includes(item)) {
          return true;
        }

        if (!arrEqual) {
          console.log(arrState);
          console.log(dataArr);
          document.querySelector(modalSelector).style.display = "block";
          document.querySelector(nextModalSelector).style.display = "none";
        }
      });
    });
  }

  const modalTimer = setTimeout(() => {
    document.querySelector(".popup").style.display = "block";
    document.body.classList.add("modal-open");
  }, 60000);

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
  modalValidator(
    state,
    ".popup_calc",
    ".popup_calc_profile",
    ".popup_calc_button",
    "form",
    "width",
    "height"
  );
  modalValidator(
    state,
    ".popup_calc_profile",
    ".popup_calc_end",
    ".popup_calc_profile_button",
    "type",
    "profile"
  );
};

export default modals;



