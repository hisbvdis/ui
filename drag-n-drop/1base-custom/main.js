"use strict";

// Drago (draggable object) - перетаскиваемый объект
let drago = document.querySelector(".drago");
// DragArea - допустимая область перетаскивания
let dragArea = document.querySelector(".dragArea");

// Переменные для хранения расстояния от края Drago до точки клика на него
// Вычисляются в функции "dragoClickCoords()"
// По умолчанию значение равно половине размера Drago, чтобы при перемещении
// ..под курсор без предварительного нажатия на Drago, курсор оказывался
// ..в центре
let dragoClickX = drago.offsetWidth / 2;
let dragoClickY = drago.offsetHeight / 2;

// Переменная для хранения координаты, в которую нужно перемещать Drago
// Вычисляется в функции вычисления координат "calcDestCoords()"
let destX;
let destY;

// Переменная для объекта с границами области перетаскивания
// Вычисляются в функции подготовки "calcDragBoundaries()"
let bounds;


drago.addEventListener("pointerdown", drago_Pointerdown_Handler);



// ================================================================
// ФУНКЦИИ
// ================================================================
// Определить место клика внутри Drago
function calcDragoClickCoords(evt) {
  // Вычисление расстояния от левого края Drago до места клика на Drago
  // Из координаты клика вычесть координату левого края Drago
  dragoClickX = evt.clientX - drago.getBoundingClientRect().left;
  dragoClickY = evt.clientY - drago.getBoundingClientRect().top;
}


// Позиционирование Drago для дальнейшего перемещения
function dragoPrepPosition(evt) {
  // Разместить Drago в абсолютных координатах
  drago.style.position = "absolute";
  // Разместить Drago поверх всего остального
  drago.style.zIndex = "1000";
  // Убрать смещение элемента, ранее заданное через "transform"
  drago.style.transform = "translate(0)";

  // Переместить Drago в `body`, чтобы среди предков не было `pos:relative`
  document.body.append(drago);

  // Сразу перенести Drago под курсор, чтобы не было "скачка"
  updateDragoPosition(evt);
}


// Рассчёт границы перетаскивания с учётом размеров Drago
function calcBounds() {
  bounds = {
    top:    dragArea.getBoundingClientRect().top,
    right:  dragArea.getBoundingClientRect().right - drago.offsetWidth,
    bottom: dragArea.getBoundingClientRect().bottom - drago.offsetHeight,
    left:   dragArea.getBoundingClientRect().left,
  }
}


// Обновить позицию Drago (рассчитать координаты назначения + переместить)
function updateDragoPosition(evt) {
  calcDestCoords(evt);
  moveDragoTo();
}


// Рассчитать координаты места, куда нужно переместить Drago
function calcDestCoords(evt) {
  // Координата, в которую нужно переместить Drago (сохранив позицию при клике):
  // 1) Чтобы Drago оставался под курсором в месте клика, нужно из координат
  //    курсора во время клика вычесть "dragoClickX" (расстояние "от края Drago
  //    до точки клика на него), которое определяется в ф-и "dragoClickCoords"
  destX = evt.pageX - dragoClickX;
  destY = evt.pageY - dragoClickY;

  // Если не определены границы области перетаскивания, остановить функцию
  // ..то есть, не выполнять проверку курсора в границах DragArea
  if (!bounds) return;
  // Проверка, находится ли курсор в пределах границ области перетаскивания
  // ..если нет, задать Drago положение у границы области
  if (destY < bounds.top)    destY = bounds.top;
  if (destX > bounds.right)  destX = bounds.right;
  if (destY > bounds.bottom) destY = bounds.bottom;
  if (destX < bounds.left)   destX = bounds.left;
}


// Переместить Drago к рассчитанным координатам курсора
function moveDragoTo() {
  // Перемещение Drago в новую позицию путём задания позиции через стили
  drago.style.left = destX + "px";
  drago.style.top = destY + "px";
}



// ================================================================
// ОБРАБОТЧИКИ
// ================================================================
// Коснулись Drago  =>  Подготовиться к перемещению Drago
function drago_Pointerdown_Handler(evt) {
  // Если нажали мышью, но не ЛКМ, остановить дальнейшее выполнение
  if (evt.pointerType === "mouse" && evt.which !== 1) return;

  // Предотвратить стандартное выделение элементов при зажатой ЛКМ
  evt.preventDefault();

  // Определить место клика внутри Drago
  calcDragoClickCoords(evt);

  // Позиционирование Drago для дальнейшего перемещения
  dragoPrepPosition(evt);

  // Рассчёт границы перетаскивания с учётом размеров Drago (если есть 
  // ..область перетаскивания)
  if (dragArea) calcBounds();

  // Захватить Drago
  // Все события указателя будут перенаправляться на Drago, пока не разорвётся
  // ..захват (разрывается автоматически при "pointerup" или "pointercancel")
  drago.setPointerCapture(evt.pointerId);

  // Добавление обработчиков
  drago.addEventListener("dragstart", drago_Dragstart_Handler);
  drago.addEventListener("pointermove", drago_Pointermove_Handler);
  drago.addEventListener("pointerup", drago_Pointerup_Handler);
}


// Движение указателя  =>  Обновление позиции Drago
function drago_Pointermove_Handler(evt) {
  // Рассчитать координаты места назначения и переместить Drago
  updateDragoPosition(evt);
}


// Отпустили указатель с Drago  =>  Остановить перемещение Drago
function drago_Pointerup_Handler() {
  // Сброс координат клика на Drago
  dragoClickX = drago.offsetWidth / 2;
  
  // Удаление обработчиков обработчиков
  drago.removeEventListener("dragstart", drago_Dragstart_Handler);
  drago.removeEventListener("pointermove", drago_Pointermove_Handler);
  drago.removeEventListener("pointerup", drago_Pointerup_Handler);
}


// Предотвращение перехвата браузером Drag-n-Drop события, которое наступает
// ..при перемещении <img> и некоторых других элементов мышью
function drago_Dragstart_Handler() {
  return false;
}