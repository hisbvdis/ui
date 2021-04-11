"use strict";

import { prevSlide, nextSlide } from "./changeSlide.js";
import { calcPointerToSliderPos } from "./calcPointerToSliderPos.js";

let slider = document.querySelector(".slider");


slider.addEventListener("click", slider_Click_Handler);


function slider_Click_Handler(evt) {
  if (evt.which !== 1) return;

  if (calcPointerToSliderPos(evt, slider) === "prev") prevSlide();
  if (calcPointerToSliderPos(evt, slider) === "next") nextSlide();
}