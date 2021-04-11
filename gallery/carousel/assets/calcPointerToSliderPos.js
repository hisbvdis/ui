"use strict";

export function calcPointerToSliderPos(evt, slider) {
  let pointerX = evt.pageX;
  let slidesLeft = slider.getBoundingClientRect().left;
  let slidesWidth = slider.getBoundingClientRect().width;
  let clickFromSlidesLeft = pointerX - slidesLeft;
  let percents = Math.trunc(clickFromSlidesLeft / slidesWidth * 100);

  if (percents <= 40) {
    return "prev";
  }
  if (percents > 40) {
    return "next";
  }
}