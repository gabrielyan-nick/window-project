"use strict";

import "./slider";
import modals from "./modules/modal";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';


window.addEventListener("DOMContentLoaded", () => {
  let modalState = {};
  
  tabs(".glazing_slider", ".glazing_block", ".glazing_content", "active");
  tabs(
    ".decoration_slider",
    ".no_click",
    ".decoration_content > div > div",
    "after_click"
  );
  forms(modalState);
  tabs(".balcon_icons", ".balcon_icons_img", ".big_img > img", "do_image_more");
  changeModalState(modalState);
  modals(modalState);
  timer('.container1', '2022-10-13');
  images();
});
