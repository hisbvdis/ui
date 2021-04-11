"use strict";

let slides = document.querySelector(".slides").children;
let thumbs = document.querySelector(".thumbs").children;

let currentIndex = 1;
let nextIndex = 0;
let currentSlideElem = slides[0];
let currentThumbElem = thumbs[0];


export function prevSlide() {
  showSlide(currentIndex -= 1);
}


export function nextSlide() {
  showSlide(currentIndex += 1);
}


export function showSlide(index) {
  checkIndex(index);
  changeImage();
  changeThumb();
  updateThings();
}


function checkIndex(nextNum) {
  nextIndex = nextNum;
  
  // Если индекс больше количества фото, показать 1 фото (сделать индекс = 1)
  if (nextNum > slides.length) {
    nextIndex = 1;
  }
  // Если индекс < 0, показать последнее фото (сделать индекс = кол-ву фото)
  if (nextNum < 1) {
    nextIndex = slides.length;
  }
}


function changeImage() {
  // Скрыть текущий слайд
  currentSlideElem.classList.remove("slides__item--visible");

  // Показать новый слайд
  slides[nextIndex - 1].classList.add("slides__item--visible");
}


function changeThumb() {
  // Снять отметку с текущего эскиза
  currentThumbElem.classList.remove("thumbs__item--active");

  // Подсветить новый эскиз
  thumbs[nextIndex - 1].classList.add("thumbs__item--active");
}


function updateThings() {
  currentIndex = nextIndex;
  currentSlideElem = slides[nextIndex - 1];
  currentThumbElem = thumbs[nextIndex - 1];
}