import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input");

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так..",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;

    let res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res.text();
  };

  const clearForm = () => {
    inputs.forEach((item) => {
      item.value = "";
    });
  };

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.insertAdjacentElement("beforeend", statusMessage);

      const formData = new FormData(item);
      if (item.getAttribute('data-calc') === 'end') {    // Если отправляется вторая форма.
        for (let key in state) {
          formData.append(key, state[key]);
        }
        setTimeout(() => {
          document.querySelector('.popup_calc_end').style.display = 'none';
          document.body.classList.remove("modal-open");
        }, 2000);
        document.querySelectorAll(".checkbox").forEach(item => {
          item.checked = false;
        });
      }

      
      // const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("assets/server.php", formData)
        .then((data) => {
          console.log(data);
          statusMessage.textContent = message.success;
        })
        .catch((data) => {
          console.log(data);
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          for (let key in state) {
            delete state[key];
          }
          console.log(state);
          clearForm();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
