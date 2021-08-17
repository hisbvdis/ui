// Импорт функции вычисления положения указателя относительно ".slides"
import { calcPointerToSlidesPos } from "../parts/pointer-position.js";

// Элемент ".slides"
let slides = document.querySelector(".slides");
// Кнопка "Назад"
let slideBtnPrev = document.querySelector(".slides__slideBtn--prev");
// // Кнопка "Вперёд"
let slideBtnNext = document.querySelector(".slides__slideBtn--next");


// Добавить обработчик события "движение указателя над элементом"
slides.addEventListener("pointermove", slides_Pointermove_Handler);


// Функция-обработчик
function slides_Pointermove_Handler(evt) {
  let pointerArea = calcPointerToSlidesPos(evt, slides);

  if (pointerArea === "prev") {
    removeHighlightModificator(slideBtnNext);
    addHighlightModificator(slideBtnPrev);
  }

  if (pointerArea === "next") {
    removeHighlightModificator(slideBtnPrev);
    addHighlightModificator(slideBtnNext);
  }
}


// Добавить класс-модификатор прозрачности к кнопке
function addHighlightModificator(slideBtn) {
  slideBtn.classList.add("slides__slideBtn--highlight");
}


// Удалить класс-модификатор прозрачности у кнопки
function removeHighlightModificator(slideBtn) {
  slideBtn.classList.remove("slides__slideBtn--highlight");
}
