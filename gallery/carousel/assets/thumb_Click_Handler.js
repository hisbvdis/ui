"use strict";

import { showSlide } from "./changeSlide.js";

let thumbs = document.querySelector(".thumbs");


thumbs.addEventListener("click", thumbs_Click_Handler);


function thumbs_Click_Handler(evt) {
  // Если нажатие не левой кнопкой мыши, остановить функцию
  if (evt.which !== 1) return;
  // 
  if (evt.target.tagName !== "IMG") return;
  // // Если нажатие на активный эскиз, остановить функцию
  // if (evt.target.closest(".thumbs__item--active") !== null) return;

  let itemsArray = Array.from(thumbs.children);
  let currentItem = evt.target.closest(".thumbs__item");
  let index = itemsArray.indexOf(currentItem);
  
  showSlide(index + 1);
}