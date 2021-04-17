"use strict";

// Вычисление положения указателя относительно элемента `.slides`
export function calcPointerToSlidesPos(evt, slidesElem) {
  // Координата указателя по оси "X" относительно документа
  let pointerX = evt.pageX;

  // Координата левой грани элемента ".slides"
  let slidesLeftBorder = slidesElem.getBoundingClientRect().left;

  // Ширина элемента ".slides"
  let slidesWidth = slidesElem.getBoundingClientRect().width;

  // Расстояние от левой грани элемента ".slides" до указателя
  let distanceFromSlidesLeftToPointer = pointerX - slidesLeftBorder;

  // Расстояние от левой грани элемента ".slides" до указателя - в процентах от ширины ".slides"
  let percents = Math.trunc(distanceFromSlidesLeftToPointer / slidesWidth * 100);


  // Если курсор в левой половине элемента (percents <= 40%), вернуть "prev"
  if (percents <= 40) return "prev";

  // Если курсор в левой половине элемента (percents < 40%), вернуть "prev"
  if (percents > 40) return "next";
}