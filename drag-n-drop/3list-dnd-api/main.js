"use strict";

// Drago (draggable object) - перетаскиваемый объект
let drago;
// Идентификатор группы перетаскиваемых элементов
let dragGroup;
// Элемент, нада которым перетаскивается Drago
let covered;
// Центр элемента, над которым перетаскивается Drago
let coveredCenterY;
// Идентификатор элемента, являющегося допустимой "зоной сброса"
let dropzone;

document.addEventListener("dragstart", drago_Dragstart_Handler);



// =================================================================
// ФУНКЦИИ
// =================================================================
// Подготовиться к перемещению
function prepareToDrag(evt) {
  // Определить глобальные переменные
  drago = evt.target;
  dragGroup = drago.dataset.dragGroup;
  dropzone = drago.dataset.dropzone;

  // Добавить Drago класс перемещения
  drago.classList.add("draggable");

  // Добавить обработчики перемещения
  document.addEventListener("dragover", forDropzone_onDocument_Dragover_Handler);
  document.addEventListener("drop", forDropzone_onDocument_Drop_Handler);
  drago.addEventListener("dragend", drago_Dragend_Handler);
}


//
function drag(evt) {
  // Определить элемент, над которым перетаскивается Drago
  covered = evt.target;

  // Вычислить центр элемента "covered"
  calcCoveredCenter();

  // Переместить Drago перед/после Covered (в зависимости от положения курсора)
  relocateDrago(evt);
}


// Завершить перемещение
function endDrag() {
  // Удалить у Drago класс перемещения
  drago.classList.remove("draggable");

  // Удалить обработчики перемещения
  document.removeEventListener("dragover", forDropzone_onDocument_Dragover_Handler);
  document.removeEventListener("drop", forDropzone_onDocument_Drop_Handler);
  drago.removeEventListener("dragend", drago_Dragend_Handler);

  // Удалить глобальные переменные
  drago = null;
  covered = null;
  coveredCenterY = null;
}


// Вычислить центр элемента, над которым находится перетаскиваемый элемент
function calcCoveredCenter() {
  let metrics = covered.getBoundingClientRect();

  coveredCenterY = metrics.top + metrics.height / 2;
}


// Переместить Drago перед/после Covered (в зависимости от положения курсора)
function relocateDrago(evt) {
  if (evt.clientY < coveredCenterY) covered.before(drago);
  if (evt.clientY > coveredCenterY) covered.after(drago);
}



// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Потянули Drago
//    =>  Начать перемещение
function drago_Dragstart_Handler(evt) {
  if (!evt.target.draggable) return;

  prepareToDrag(evt);
}


// Перемещение Drago над "зоной сброса"
function forDropzone_onDocument_Dragover_Handler(evt) {
  // Предотвратить поведение (чтобы позволить сбрасывать элементы в эту область)
  evt.preventDefault();

  // Если указатель не над зоной сброса, остановить обработчик
  if (evt.target.dataset.dropzone !== dropzone) return;

  // Если указатель над Drago, остановить обработчик
  if (evt.target === drago) return;

  // Если указатель не над другим элементом из той же группы
  // ..перетаскиваемых элементов, остановить обработчик
  if (evt.target.dataset.dragGroup !== dragGroup) return;

  drag(evt);
}


// Отпустили Drago над "зоной сброса"
function forDropzone_onDocument_Drop_Handler(evt) {
  // Предотвратить поведение (чтобы позволить сбрасывать элементы в эту область)
  evt.preventDefault();
}


// Отпустили Drago
//    =>  Остановить перемещение Drago
function drago_Dragend_Handler() {
  endDrag();
}