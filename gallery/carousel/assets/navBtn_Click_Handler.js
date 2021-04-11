"use strict";

import { prevSlide, nextSlide } from "./changeSlide.js";

let prevBtn = document.querySelector(".slider__navBtn--prev");
let nextBtn = document.querySelector(".slider__navBtn--next");


prevBtn.addEventListener("click", prevBtn_Click_Handler);
nextBtn.addEventListener("click", nextBtn_Click_Handler);


function prevBtn_Click_Handler(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  prevSlide();
}


function nextBtn_Click_Handler(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  nextSlide();
}