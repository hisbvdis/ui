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
function prepareDrag(evt) {
  // Определить глобальные переменные
  drago = evt.target;
  dragArea = document.querySelector("#" + evt.target.dataset.dragArea);
  dragoClickX = drago.offsetWidth / 2;
  dragoClickY = drago.offsetHeight / 2;
  
  // Вычислить границы области перемещения (с учётом размеров Drago)
  calcBoundaries();
  
  // Вычислить место клика внутри Drago
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


// Вычислить место клика внутри Drago
function calcDragoClickCoords(clientX, clientY) {
  // Расстояние от левого края Drago до места клика на Drago
  // Из координаты клика вычесть координату левого края Drago
  dragoClickX = clientX - drago.getBoundingClientRect().left;

  // Расстояние от верхнего края Drago до места клика на Drago
  // Из координаты клика вычесть координату верхнего края Drago
  dragoClickY = clientY - drago.getBoundingClientRect().top;  
}


// Подготовить Drago к перемещению
function prepareDrago() {
  // Разместить Drago в абсолютных координатах
  drago.style.position = "absolute";

  // Разместить Drago поверх всего остального
  drago.style.zIndex = "1000";

  // Переместить Drago в body, чтобы среди предков не было "position: relative"
  document.body.append(drago);
}


// Рассчитать координаты места, куда нужно переместить Drago
function calcDestCoords(pageX, pageY) {
  // 1. Координата, в которую переместить Drago (сохранив позицию под курсором):
  // 1.1 Чтобы Drago оставался под курсором в месте клика, нужно из координат
  //     курсора (относительно документа) вычесть расстояние от края Drago
  //     до точки клика на него
  let destX = pageX - dragoClickX;
  let destY = pageY - dragoClickY;

  // 2. Проверить, находится ли курсор в пределах области перетаскивания
  // 2.1 Если не определены границы области перетаскивания, остановить функцию
  //     то есть, не выполнять проверку курсора в границах DragArea
  if (!boundaries) return [ destX, destY ];
  // 2.2 Если границы определены, задать для Drago положение у границы области
  if (destY < boundaries.top)    destY = boundaries.top;
  if (destX > boundaries.right)  destX = boundaries.right;
  if (destY > boundaries.bottom) destY = boundaries.bottom;
  if (destX < boundaries.left)   destX = boundaries.left;

  return [ destX, destY ];
}


// Переместить Drago к указанным координатам курсора
function moveDragoTo(x, y) {
  // Перемещение Drago в новую позицию путём задания позиции через стили
  drago.style.left = x + "px";
  drago.style.top = y + "px";
}



// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Коснулись Drago
//    =>  Подготовиться к перемещению
function drago_Pointerdown_Handler(evt) {
  // Если нажали мышью, но не ЛКМ, остановить обработчик
  if (evt.which !== 1) return;

  // Если нет атрибута "drago", остановить обработчик
  if (evt.target.dataset.drago === undefined) return;
  
  // Предотвратить стандартное выделение элементов при зажатой ЛКМ
  evt.preventDefault();

  // Подготовиться к перемещению
  prepareDrag(evt);
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