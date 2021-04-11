"use strict";

import { calcPointerToSliderPos } from "./calcPointerToSliderPos.js";

let slider = document.querySelector(".slider");
let prevBtn = document.querySelector(".slider__navBtn--prev");
let nextBtn = document.querySelector(".slider__navBtn--next");


slider.addEventListener("pointermove", slider_PointerMove_Handler);

function slider_PointerMove_Handler(evt) {
  if (calcPointerToSliderPos(evt, slider) === "prev") {
    removeOpacityMod(nextBtn);
    addOpacityMod(prevBtn);
  }
  else if (calcPointerToSliderPos(evt, slider) === "next") {
    removeOpacityMod(prevBtn);
    addOpacityMod(nextBtn)
  }
}


function addOpacityMod(navBtn) {
  navBtn.classList.add("slider__navBtn--opacity-1");
}


function removeOpacityMod(navBtn) {
  navBtn.classList.remove("slider__navBtn--opacity-1");
}