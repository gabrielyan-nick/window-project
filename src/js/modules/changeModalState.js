import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
  const windowForm = document.querySelectorAll(".balcon_icons_img"),
    windowWidth = document.querySelectorAll("#width"),
    windowHeight = document.querySelectorAll("#height"),
    windowType = document.querySelectorAll("#view_type"),
    windowProfile = document.querySelectorAll(".checkbox");

  checkNumInputs("#height");
  checkNumInputs("#width");

  function setDataValue(event, elem, prop) {  // Функция для записи данных из инпутов в обьект.
    elem.forEach((item, i) => {               // Вешаем обработчик на каждый инпут и в зависимости от типа инпута, записываем данные в обьект.
      item.addEventListener(event, () => {
        switch (item.nodeName) {
          case "SPAN":
            state[prop] = i;
            break;
          case "INPUT":
            if (item.getAttribute("type") === "checkbox") {
              i === 0 ? (state[prop] = "Холодное") : (state[prop] = "Теплое");
              elem.forEach((box, j) => {  // Выбор только одного чекбокса.
                box.checked = false;
                if (i == j) {
                  box.checked = true;
                }
              });
            } else {
              state[prop] = item.value;
            }
            break;
          case "SELECT":
            state[prop] = item.value;
            break;
        }
        console.log(state);
      });
    });
  }

  setDataValue("click", windowForm, "form");
  setDataValue("input", windowWidth, "width");
  setDataValue("input", windowHeight, "height");
  setDataValue("change", windowType, "type");
  setDataValue("change", windowProfile, "profile");
};

export default changeModalState;
