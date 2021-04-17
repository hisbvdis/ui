"use strict";

// Импорт функции вычисления положения курсора относительно ".slides"
import { calcPointerToSlidesPos } from "./_calcPointerToSlidesPos.js";

// Элемент ".slides"
let slidesElem = document.querySelector(".slides");
// Кнопка "Назад"
let slideBtnPrev = document.querySelector(".slides__slideBtn--prev");
// // Кнопка "Вперёд"
let slideBtnNext = document.querySelector(".slides__slideBtn--next");


// Добавить обработчик события "движение указателя над элементом"
slidesElem.addEventListener("pointermove", slides_Pointermove_Handler);


// Функция-обработчик
function slides_Pointermove_Handler(evt) {
  let area = calcPointerToSlidesPos(evt, slidesElem);

  if (area === "prev") {
    removeOpacityModif(slideBtnNext);
    addOpacityModif(slideBtnPrev);
  }

  if (area === "next") {
    removeOpacityModif(slideBtnPrev);
    addOpacityModif(slideBtnNext);
  }
}


// Добавить класс-модификатор прозрачности к кнопке
function addOpacityModif(slideBtn) {
  slideBtn.classList.add("slides__slideBtn--opacity-1");
}


// Удалить класс-модификатор прозрачности у кнопки
function removeOpacityModif(slideBtn) {
  slideBtn.classList.remove("slides__slideBtn--opacity-1");
}
