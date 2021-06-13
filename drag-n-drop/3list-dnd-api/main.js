"use strict";

// Drago (draggable object) - перетаскиваемый объект
let drago;
// Lower - элемент, нада которым перетаскивается Drago
let lower;
// Центр элемента, над которым перетаскивается Drago
let lowerCenterY;
// Идентификатор "зон сброса", в которые можно сбрасывать элемент
let targetDropzoneName;


document.addEventListener("dragstart", drago_Dragstart_Handler);



// =================================================================
// ФУНКЦИИ
// =================================================================
// Подготовиться к перемещению
function prepareToDrag(evt) {
  // Определить глобальные переменные
  drago = evt.target;
  targetDropzoneName = drago.dataset.targetDropzone;

  // Добавить Drago класс перемещения
  drago.classList.add("draggable");

  // Добавить обработчики перемещения
  document.addEventListener("dragover", forDropzone_onDocument_Dragover_Handler);
  drago.addEventListener("dragend", drago_Dragend_Handler);
}


//
function drag(evt) {
  // Определить элемент, над которым находится Drago
  lower = evt.target;

  // Вычислить центр элемента "lower"
  calcLowerCenter();

    // Если курсор выше/ниже центра Lower, переместить Drago перед/после Lower
  if (evt.clientY < lowerCenterY) insertBeforeLower();
  if (evt.clientY > lowerCenterY) insertAfterLower();
}


// Завершить перемещение
function endDrag() {
  // Удалить у Drago класс перемещения
  drago.classList.remove("draggable");

  // Удалить обработчики перемещения
  document.removeEventListener("dragover", forDropzone_onDocument_Dragover_Handler);
  drago.removeEventListener("dragend", drago_Dragend_Handler);

  // Удалить глобальные переменные
  drago = null;
  lower = null;
  lowerCenterY = null;
  targetDropzoneName = null;
}


// Вычислить центр элемента, над которым находится перетаскиваемый элемент
function calcLowerCenter() {
  let metrics = lower.getBoundingClientRect();

  lowerCenterY = metrics.top + metrics.height / 2;
}


// Переместить Drago перед Lower
function insertBeforeLower() {
  // Если курсор над самим Drago, не добавлять
  if (lower === drago) return;

  // Если Drago уже находится перед Lower, не добавлять
  if (lower.previousElementSibling === drago) return;

  lower.before(drago);
}


// Переместить Drago после Lower
function insertAfterLower() {
  // Если курсор над самим Drago, не добавлять
  if (lower === drago) return;

  // Если Drago уже находится после Lower, не добавлять
  if (lower.nextElementSibling === drago) return;

  lower.after(drago);
}



// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Потянули Drago
//    =>  Начать перемещение
function drago_Dragstart_Handler(evt) {
  // Если перетаскивается не "draggable" элемент, остановить обработчик
  if (!evt.target.draggable) return;

  prepareToDrag(evt);
}


// Перемещение Drago над "зоной сброса"
function forDropzone_onDocument_Dragover_Handler(evt) {
  // Найти допустимую "зону сброса" под указателем или среди предков
  let dropzone = evt.target.closest(`[data-dropzone="${targetDropzoneName}"]`);

  // Если допустимую "зону сброса" найти не удалось, остановить обработчик
  if (!dropzone) return;

  // Позволить сброс (меняется курсор и разрешает событие "drop")
  evt.preventDefault();

  drag(evt);
}


// Отпустили Drago
//    =>  Остановить перемещение Drago
function drago_Dragend_Handler() {
  endDrag();
}