const images = () => {
  const imgPopup = document.createElement("div"),
    workSection = document.querySelector(".works"),
    bigImg = document.createElement("img");

  imgPopup.classList.add("image_popup");
  workSection.appendChild(imgPopup);
  imgPopup.style.justifyContent = "center";
  imgPopup.style.alignItems = "center";
  imgPopup.appendChild(bigImg);

  workSection.addEventListener("click", (e) => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains("preview")) {
      imgPopup.style.display = "flex";
      const path = target.parentNode.getAttribute("href");
      bigImg.setAttribute("src", path);
      bigImg.style.cssText = "max-width:100%;max-height:100%;";
      document.body.style.overflow = "hidden";
    }

    if (target && target.matches("div.image_popup")) {
      imgPopup.style.display = "none";
      document.body.style.overflow = "";
    }
  });
};

export default images;
