// Drago (draggable object) - перетаскиваемый объект (ползунок)
let drago = document.querySelector(".range__pin");
// DragArea - допустимая область перетаскивания (полоса диапазона)
let dragArea = document.querySelector(".range__line");
// Заполнитель полосы диапазона
let filler = document.querySelector(".range__filler");

// Переменные для хранения расстояния от края Drago до точки клика на него.
// Вычисляются в функции подготовки к перемещению "dragoClickCoords()"
// По умолчанию значение равно половине размера Drago, чтобы при перемещении
// ..под курсор без предварительного нажатия на Drago, курсор оказывался
// ..в центре
let dragoClickX = drago.offsetWidth / 2;

// Переменная для хранения координаты, в которую нужно перемещать Drago
// Вычисляется в функции вычисления координат "calcDestCoords()"
let destX;

// Переменные для хранения координат границ, за которые не может выходить Drago
// Вычисляются в функции подготовки "dragoMaxCoords()"
let bounds;


drago.addEventListener("pointerdown", drago_Pointerdown_Handler);
dragArea.addEventListener("pointerdown", dragArea_Pointerdown_Handler);



// ===================================================================
// ФУНКЦИИ
// ===================================================================
// Определить место клика внутри Drago
function calcDragoClickCoords(evt) {
  // Вычисление расстояния от левого края Drago до места клика на Drago
  // Из координаты клика вычесть координату левого края Drago
  dragoClickX = evt.clientX - drago.getBoundingClientRect().left;
}


// Вычислить максимально допустимое положение Drago на полосе
function calcBounds() {
  // "ширина полосы" минус "ширина Drago"
  bounds = {
    left: 0,
    right: dragArea.offsetWidth - drago.offsetWidth,
  };
}


// Рассчитать координаты места, куда нужно переместить Drago
function calcDestCoords(evt) {
  // Координата, в которую нужно переместить Drago (сохранив позицию при клике):
  // 1. Чтобы Drago оставался под курсором в месте клика, нужно из координат
  //    курсора во время клика вычесть "dragoClickX" - расстояние "от края Drago
  //    до точки клика на него", которое определяется в функции "подготовки"
  // 2. Позиция Drago задаётся относительно левого края полосы (её начала).
  //    Чтобы рассчитать это положение относительно начала полосы,
  //    из координаты клика нужно вычесть координату левого края полосы
  destX = evt.clientX - dragoClickX - dragArea.getBoundingClientRect().left;

  // Если не определены границы области перетаскивания, остановить функцию
  // ..то есть, не выполнять проверку курсора в границах DragArea
  if (!bounds) return;
  // Проверка, находится ли курсор в пределах границ области перетаскивания
  // ..если нет, задать Drago положение у границы области
  if (destX < bounds.left)   destX = bounds.left;
  if (destX > bounds.right)  destX = bounds.right;
}


// Переместить Drago к рассчитанным координатам курсора
function moveDragoTo() {
  // Перемещение Drago в новую позицию путём задания смещения слева через стили
  drago.style.left = destX + "px";
}


// Обновить ширину полосы диапазона
function updateFillerWidth() {
  filler.style.width = destX + "px";
}


// Рассчитать координаты места назначения + переместить Drago
function updateDragoPosition(evt) {
  calcDestCoords(evt);
  moveDragoTo();
  updateFillerWidth();
}



// ===================================================================
// ОБРАБОТЧИКИ
// ===================================================================
// Надавили ЛКМ на Drago
//    =>  Подготовиться к перемещению Drago
function drago_Pointerdown_Handler(evt) {
  // Если нажали мышью, но не ЛКМ, остановить дальнейшее выполнение
  if (evt.pointerType === "mouse" && evt.which !== 1) return;

  // Предотвратить стандартное выделение элементов при зажатой ЛКМ
  evt.preventDefault();

  // Определить место клика внутри Drago
  calcDragoClickCoords(evt);

  // Рассчёт границы перетаскивания с учётом размеров Drago (если есть 
  // ..область перетаскивания)
  if (dragArea) calcBounds();

  // Захватить Drago
  // Все события указателя будут перенаправляться на Drago, пока не разорвётся
  // ..захват (разрывается автоматически при "pointerup" или "pointercancel")
  drago.setPointerCapture(evt.pointerId);

  // Добавление обработчиков после надавливания на Drago
  drago.addEventListener("dragstart", drago_Dragstart_Handler);
  drago.addEventListener("pointermove", drago_Pointermove_Handler);
  drago.addEventListener("pointerup", drago_Pointerup_Handler);
}


// Движение курсора  =>  Перемещать Drago
function drago_Pointermove_Handler(evt) {
  // Рассчитать координаты места назначения и переместить Drago
  updateDragoPosition(evt);
}


// Отпустили ЛКМ с Drago  =>  Остановить перемещение Drago
function drago_Pointerup_Handler() {
  // Сброс координат клика на Drago
  dragoClickX = drago.offsetWidth / 2;
  
  // Удаление обработчиков после отпускания Drago
  drago.removeEventListener("dragstart", drago_Dragstart_Handler);
  drago.removeEventListener("pointermove", drago_Pointermove_Handler);
  drago.removeEventListener("pointerup", drago_Pointerup_Handler);
}


// Предотвращение перехвата браузером Drag-n-Drop события, которое наступает
// ..при перемещении <img> и некоторых других элементов мышью
function drago_Dragstart_Handler() {
  return false;
}


// Нажали на полосу  =>  Переместить Drago + Запустить обработчик нажатия на Drago
function dragArea_Pointerdown_Handler(evt) {
  // Если нажали мышью, но не ЛКМ, остановить дальнейшее выполнение
  if (evt.pointerType === "mouse" && evt.which !== 1) return;
  
  calcBounds();
  updateDragoPosition(evt);
  drago_Pointerdown_Handler(evt);
}