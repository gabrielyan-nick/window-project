const forms = () => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {
      item.addEventListener('input', (e) => {
       item.value = item.value.replace(/\D/g, '');
      });
    });

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
    inputs.forEach(item => {
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

      // const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("assets/server.php", formData)
        .then(data => {
          console.log(data);
          statusMessage.textContent = message.success;
        })
        .catch(data => {
          console.log(data);
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          clearForm();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
