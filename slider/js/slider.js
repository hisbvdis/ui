import {prepareToDrag} from "./dnd.js";

// Drago (draggable object) - перетаскиваемый объект
let drago;
// DragArea - допустимая область перетаскивания
let dragArea;
// Filler - заполнитель полосы диапазона
let filler;


document.addEventListener("pointerdown", forDragarea_onDocument_Pointerdown_Handler);



// Нажали на Dragarea
//    =>  Подготовиться к перемещению
function forDragarea_onDocument_Pointerdown_Handler(evt) {
  // Если нажали не ЛКМ, остановить обработчик
  if (evt.which !== 1) return;
  // Если нет атрибута "drago", остановить обработчик
  if (evt.target.dataset.dragarea === undefined) return;
  // Предотвратить стандартное выделение элементов при зажатой ЛКМ
  evt.preventDefault();

  dragArea = evt.target;
  drago = dragArea.querySelector("[data-drago]");
  filler = dragArea.querySelector("[data-filler]");
  axis = drago.dataset.axis ?? false;

  prepareToDrag(evt, "dragarea");
}