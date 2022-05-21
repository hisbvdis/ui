// Размеры и стили для настройки прокрутки
let scrollBarWidth = null;
let bodyPaddingRight = null;
let bodyOverflow = null;

// Интерактивные элементы окна
let modalInteractElems = null;
let firstModalElem = null;
let lastModalElem = null;

// Особые кнопки действий (фокус, Ctrl+Enter)
let ctrlEnterBtn = null;

// Действия при открытии/закрытии окна
let openActions = null;
let closeActions = null;

// Подложка
// Создать
const node = document.createElement("div");
node.classList.add("modalBackdrop");
document.body.append(node);
// Переменная для подложки
const backdrop = document.querySelector(".modalBackdrop");
// Статус нажатия на подложку
let clickOnLayout = false;

// Обработчики для функционирования модального окна:
// - нажатие на кнопки, открывающие модальное окно
document.addEventListener("click", forOpeners_onDocument_Click_Handler);
// - открытие модального окна при нажатии "назад/вперёд" в браузере
window.addEventListener("popstate", forModal_onWindow_Popstate_Handler);


// =================================================================
// ФУНКЦИИ
// =================================================================
// Открыть модальное окно
export function openModal(modal, params) {
  // Показать модальное окно и подложку
  modal.classList.add("modal--isOpen");
  backdrop.classList.add("modalBackdrop--isOpen");
  
  // Настроить атрибуты доступности
  modal.setAttribute("aria-hidden", "false");
  
  // Разобрать параметры и назначить глобальные переменные
  openActions = params?.openActions;
  closeActions = params?.closeActions;
  ctrlEnterBtn = modal.querySelector("[data-ctrl-enter-btn]");

  // У <body> отключить прокрутку, вычислить и задать отступ
  scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  bodyPaddingRight = Number.parseFloat(getComputedStyle(document.body).paddingInlineEnd);
  document.body.style.paddingInlineEnd = bodyPaddingRight + scrollBarWidth + "px";
  bodyOverflow = getComputedStyle(document.body).overflow;
  document.body.style.overflow = "hidden";

  // Получить все интерактивные элементы внутри окна
  modalInteractElems = getModalInteractElems(modal);
  firstModalElem = modalInteractElems[0];
  lastModalElem = modalInteractElems.at(-1);

  // Фокус на 1 интерактивный элемент (если есть "data-focus", фокус на него)
  focusOn(firstModalElem);
  focusOn(modal.querySelector("[data-focus]"));

  // Добавить в историю браузера новую запись с определённым названием
  history.pushState("fromSite", "");

  // Добавление обработчиков модального окна
  modal.addEventListener("pointerdown", backdrop_Pointerdown_Handler);
  modal.addEventListener("click", backdrop_Click_Handler);
  document.addEventListener("keydown", document_Keydown_Escape_Handler);
  firstModalElem?.addEventListener("keydown", firstModalElem_Keydown_Tab_Handler);
  lastModalElem?.addEventListener("keydown", lastModalElem_Keydown_ShiftTab_Handler);
  modal.addEventListener("click", forCloseBtn_onModal_Click_Handler);
  document.addEventListener("keydown", forCtrlEnterBtn_onDocument_Keydown_CtrlEnter_Handler);

  // Выполнить команды открытия окна, если есть (передаются при открытии)
  if (openActions) openActions();
}


// Закрыть модальное окно
export function closeModal() {
  // Найти открытое модальное окно
  const modal = document.querySelector(".modal--isOpen");

  // Закрыть модальное окно
  modal.classList.remove("modal--isOpen");
  backdrop.classList.remove("modalBackdrop--isOpen");

  // Настроить атрибуты доступности
  modal.setAttribute("aria-hidden", "true");
  
  // Для <body> вернуть отступы и прокрутку, которые были до открытия модального окна
  document.body.style.paddingInlineEnd = bodyPaddingRight + "px";
  document.body.style.overflow = bodyOverflow;

  // Разные варианты перехода "назад" в браузере (обычно или с заменой записи в истории)
  history.state ? history.back() : history.replaceState(null, "");

  // Удалить обработчики модального окна
  modal.removeEventListener("pointerdown", backdrop_Pointerdown_Handler);
  modal.removeEventListener("click", backdrop_Click_Handler);
  firstModalElem.removeEventListener("keydown", firstModalElem_Keydown_Tab_Handler);
  lastModalElem.removeEventListener("keydown", lastModalElem_Keydown_ShiftTab_Handler);
  document.removeEventListener("keydown", document_Keydown_Escape_Handler);
  modal.removeEventListener("click", forCloseBtn_onModal_Click_Handler);
  document.removeEventListener("keydown", forCtrlEnterBtn_onDocument_Keydown_CtrlEnter_Handler);

  // Выполнить команды закрытия окна, если есть (передаются при открытии)
  if (closeActions) closeActions();

  // Сбросить значения глобальных переменных
  openActions = null;
  closeActions = null;
  modalInteractElems = null;
  firstModalElem = null;
  lastModalElem = null;
  clickOnLayout = false;
  ctrlEnterBtn = null;
}


// Получить все интерактивные элементы модального окна
function getModalInteractElems(modal) {
  let selectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    'select:not([disabled]):not([aria-hidden])',
    'textarea:not([disabled]):not([aria-hidden])',
    'button:not([disabled]):not([aria-hidden])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
  ];

  let elems = modal.querySelectorAll(selectors);

  return Array.from(elems);
}

// Установить фокус на элементе (без прокрутки экрана до этого элемента)
function focusOn(elem) {
  elem?.focus({preventScroll:true});
}


// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Нажали на кнопку открытия модального окна
//    =>  Открыть модальное окно
function forOpeners_onDocument_Click_Handler(evt) {
  if (!evt.target.closest('[data-modal]')) return;
  if (evt.target.closest('[data-manual-open]')) return;
  evt.preventDefault();

  let modal = document.querySelector("#" + evt.target.dataset.modal);

  openModal(modal);
}


// При открытом модальном окне нажали "Escape"
//   =>  Закрыть модальное окно
function document_Keydown_Escape_Handler(evt) {
  if (evt.code !== "Escape") return;
  evt.preventDefault();

  closeModal();
}


// Надавили указатель (ЛКМ)
//    => Проверить и записать, является ли целевой элемент подложкой
function backdrop_Pointerdown_Handler(evt) {
  if (evt.which !== 1) return;

  clickOnLayout = evt.target.classList.contains("modal");
}


// Нажали на фон модального окна
//    =>  Закрыть модальное окно
function backdrop_Click_Handler(evt) {
  if (evt.which !== 1) return;
  if (clickOnLayout === false) return;
  if (!evt.target.classList.contains("modal")) return;

  closeModal();
}


// На первом элементе формы нажали Shift+Tab
//    =>  Фокус на последний элемент
function firstModalElem_Keydown_Tab_Handler(evt) {
  if (evt.code !== "Tab") return;
  if (!evt.shiftKey) return;
  evt.preventDefault();

  focusOn(lastModalElem);
}


// На последнем элементе формы нажали Tab
//    =>  Фокус на первый элемент
function lastModalElem_Keydown_ShiftTab_Handler(evt) {
  if (evt.code !== "Tab") return;
  if (evt.shiftKey) return;
  evt.preventDefault();

  focusOn(firstModalElem);
}

// В открытом модальном окне кликнули на кнопку "Закрыть"
//    =>  Закрыть модальное окно
function forCloseBtn_onModal_Click_Handler(evt) {
  if (evt.target.dataset.closeBtn === undefined) return;
  evt.preventDefault();

  closeModal();
}


// В открытом модальном окне нажали "Ctrl+Enter"
//    =>  Нажать кнопку "Ctrl+Enter Button"
function forCtrlEnterBtn_onDocument_Keydown_CtrlEnter_Handler(evt) {
  if (!evt.ctrlKey) return;
  if (evt.code !== "Enter" && evt.code !== "NumpadEnter") return;
  evt.preventDefault();

  ctrlEnterBtn?.click();
}


// Нажали "Назад" в браузере
//    =>  Закрыть модальное окно
function forModal_onWindow_Popstate_Handler() {
  const openedModal = document.querySelector(".modal[open]");
  if (openedModal === null) return;

  closeModal();
}