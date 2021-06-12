"use strict";

// Drago (draggable object) - перетаскиваемый объект
let drago;
// DragArea - допустимая область перетаскивания
let dragArea;

// Расстояние от края Drago до точки клика на него
// - По умолчанию задаётся половина размера Drago
// - Это нужно, чтобы при нажатии за пределами Drago,
//   при его переносе под курсор, под курсором оказывался центр Drago
let dragoClickX;
let dragoClickY;

// Границы области перетаскивания (объект с координатами)
let boundaries;


document.addEventListener("pointerdown", drago_Pointerdown_Handler);



// =================================================================
// ФУНКЦИИ
// =================================================================
// Подготовиться к перемещению
function prepareToDrag(evt) {
  // Определить глобальные переменные
  drago = evt.target;
  dragArea = document.querySelector("#" + evt.target.dataset.dragArea);
  dragoClickX = drago.offsetWidth / 2;
  dragoClickY = drago.offsetHeight / 2;

  // Вычислить границы области перемещения (с учётом размеров Drago)
  calcBoundaries();

  // Вычислить координаты клика "относительно Drago"
  calcDragoClickCoords(evt.clientX, evt.clientY);

  // Подготовить Drago к перемещению
  prepareDrago();

  // Переместить Drago под курсор
  // Вызывается сразу, чтобы при начале перемещения не было "скачка"
  drag(evt.pageX, evt.pageY);

  // Захватить Drago
  // Все события указателя будут перенаправляться на Drago, пока не разорвётся
  // ..захват (разрывается автоматически при "pointerup" или "pointercancel")
  drago.setPointerCapture(evt.pointerId);

  // Добавить обработчики перемещения
  drago.addEventListener("dragstart", drago_Dragstart_Handler);
  drago.addEventListener("pointermove", drago_Pointermove_Handler);
  drago.addEventListener("pointerup", drago_Pointerup_Handler);
}


// Переместить Drago под курсор
function drag(pageX, pageY) {
  // Рассчитать координаты, в которые нужно переместить Drago
  let [x, y] = calcDestCoords(pageX, pageY);

  // Переместить Drago в координаты
  moveDragoTo(x, y);
}


// Завершить перемещение
function endDrag() {
  // Удалить обработчики перемещения
  drago.removeEventListener("dragstart", drago_Dragstart_Handler);
  drago.removeEventListener("pointermove", drago_Pointermove_Handler);
  drago.removeEventListener("pointerup", drago_Pointerup_Handler);

  // Удалить глобальные переменные
  drago = null;
  dragArea = null;
  dragoClickX = null;
  dragoClickY = null;
  boundaries = null;
}


// Вычислить границы области перемещения (с учётом размеров Drago)
function calcBoundaries() {
  if (!dragArea) return;

  boundaries = {
    top:    dragArea.getBoundingClientRect().top,
    right:  dragArea.getBoundingClientRect().right - drago.offsetWidth,
    bottom: dragArea.getBoundingClientRect().bottom - drago.offsetHeight,
    left:   dragArea.getBoundingClientRect().left,
  }
}


// Вычислить координаты клика "относительно Drago"
function calcDragoClickCoords(clientX, clientY) {
  // Из координаты X клика вычесть координату левого края Drago
  dragoClickX = clientX - drago.getBoundingClientRect().left;

  // Из координаты Y клика вычесть координату верхнего края Drago
  dragoClickY = clientY - drago.getBoundingClientRect().top;
}


// Подготовить Drago к перемещению
function prepareDrago() {
  // Разместить Drago в абсолютных координатах
  drago.style.position = "absolute";

  // Поднять Drago выше всего остального
  // Не обязательно
  // drago.style.zIndex = "1000";

  // Переместить Drago в body, чтобы среди предков не было "position: relative"
  // Не обязательно. Может быть полезно, если область перемещения не ограничена
  // document.body.append(drago);
}


// Рассчитать координаты, в которые нужно переместить Drago
function calcDestCoords(pageX, pageY) {
  // 1. Координата, в которую переместить Drago (сохранив позицию под курсором)
  // 1.1 Из координаты X клика "относительно документа" вычесть координату
  //     клика "относительно Drago"
  let destX = pageX - dragoClickX;
  // 1.2 Из координаты Y клика "относительно документа" вычесть  координату
  //      клика "относительно Drago"
  let destY = pageY - dragoClickY;

  // 2. Проверить, выходит ли курсор за пределы области перетаскивания
  //    Если не определены границы области перетаскивания, остановить
  //    функцию и вернуть координаты только с учётом позиции под курсором
  if (!boundaries) return [ destX, destY ];

  // 3. Если границы определены, задать для Drago координаты положения,
  //    не выходящего за границы области перемещения
  if (destY < boundaries.top)    destY = boundaries.top;
  if (destY > boundaries.bottom) destY = boundaries.bottom;
  if (destX > boundaries.right)  destX = boundaries.right;
  if (destX < boundaries.left)   destX = boundaries.left;
  return [ destX, destY ];
}


// Переместить Drago в указанные координаты курсора
function moveDragoTo(x, y) {
  // Перемещение Drago в новую позицию путём задания позиции через стили
  drago.style.left = x + "px";
  drago.style.top = y + "px";
}


// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Нажали на Drago
//    =>  Подготовиться к перемещению
function drago_Pointerdown_Handler(evt) {
  // Если нажали мышью, но не ЛКМ, остановить обработчик
  if (evt.which !== 1) return;

  // Если нет атрибута "drago", остановить обработчик
  if (evt.target.dataset.drago === undefined) return;

  // Предотвратить стандартное выделение элементов при зажатой ЛКМ
  evt.preventDefault();

  // Подготовиться к перемещению
  prepareToDrag(evt);
}


// Предотвратить перехват браузером Drag-n-Drop события, которое наступает
// при перемещении <img> и некоторых других элементов мышью
function drago_Dragstart_Handler() {
  return false;
}


// Перемещение указателя
//    =>  Переместить Drago под курсор
function drago_Pointermove_Handler(evt) {
  drag(evt.pageX, evt.pageY);
}


// Отпустили указатель с Drago
//    =>  Остановить перемещение Drago
function drago_Pointerup_Handler() {
  endDrag();
}