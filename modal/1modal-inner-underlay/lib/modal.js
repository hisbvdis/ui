let openedModal = null;

let trigger = null;
let ctrlEnterBtn = null;
let openActions = null;
let closeActions = null;

let modalInteractElems = null;
let firstModalElem = null;
let lastModalElem = null;
let clickOnLayout = false;

let scrollBarWidth = null;
let bodyMarginRight = null;
let bodyPaddingRight = null;
let bodyOverflow = null;


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
  // Разобрать параметры и назначить глобальные переменные
  openedModal = modal;
  trigger = document.activeElement;
  openActions = params?.openActions;
  closeActions = params?.closeActions;
  ctrlEnterBtn = modal.querySelector("[data-ctrl-enter-btn]");

  // У <body> отключить прокрутку, вычислить и задать отступ
  scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  bodyPaddingRight = getComputedStyle(document.body).getPropertyValue("padding-inline-end");
  bodyPaddingRight = Number.parseFloat(bodyPaddingRight);
  document.body.style.paddingInlineEnd = bodyPaddingRight + scrollBarWidth + "px";
  bodyOverflow = getComputedStyle(document.body).getPropertyValue("overflow");
  document.body.style.overflow = "hidden";

  // Показать подальное окно
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("tabindex", "0");
  modal.classList.add("modal--isOpen");

  // Работа с фокусом окна
  modalInteractElems = getModalInteractElems(modal);
  firstModalElem = modalInteractElems[0];
  lastModalElem = modalInteractElems[modalInteractElems.length - 1];
  if (onlyButtons(modalInteractElems)) {
    focusOn(modal.querySelector("[data-focus]"));
  } else {
    focusOn(firstModalElem);
  }

  // Добавить в историю браузера новую запись с определённым названием
  history.pushState("fromSite", "");

  // Добавление обработчиков модального окна
  modal.addEventListener("pointerdown", backdrop_Pointerdown_Handler);
  modal.addEventListener("click", backdrop_Click_Handler);
  modal.addEventListener("click", forCloseBtn_onModal_Click_Handler);
  firstModalElem?.addEventListener("keydown", firstModalElem_Keydown_Tab_Handler);
  lastModalElem?.addEventListener("keydown", lastModalElem_Keydown_ShiftTab_Handler);
  document.addEventListener("keydown", document_Keydown_Escape_Handler);
  document.addEventListener("keydown", forCtrlEnterBtn_onDocument_Keydown_CtrlEnter_Handler);

  // Выполнение команд открытия окна, которые были переданы при его открытии
  if (openActions) openActions();
}


// Закрыть модальное окно
export function closeModal(modal) {
  // Для <body> вернуть отступы и прокрутку, которые были до открытия модального окна
  document.body.style.paddingInlineEnd = bodyPaddingRight + "px";
  document.body.style.overflow = bodyOverflow;

  // Скрыть модальное окно
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("tabindex", "-1");
  modal.classList.remove("modal--isOpen");

  // Переход "назад" в истории так, чтобы не создавать дубликаты в истории
  history.state ? history.back() : history.replaceState(null, "");

  // Фокус на элементе, вызвавшем модальное окно
  trigger.focus();

  // Удаление обработчиков модального окна
  modal.removeEventListener("pointerdown", backdrop_Pointerdown_Handler);
  modal.removeEventListener("click", backdrop_Click_Handler);
  modal.removeEventListener("click", forCloseBtn_onModal_Click_Handler);
  firstModalElem.removeEventListener("keydown", firstModalElem_Keydown_Tab_Handler);
  lastModalElem.removeEventListener("keydown", lastModalElem_Keydown_ShiftTab_Handler);
  document.removeEventListener("keydown", document_Keydown_Escape_Handler);
  document.removeEventListener("keydown", forCtrlEnterBtn_onDocument_Keydown_CtrlEnter_Handler);

  // Выполнение команд закрытия окна, которые были переданы при его открытии
  if (closeActions) closeActions();

  // Удалить глобальные переменные
  openedModal = null;

  trigger = null;
  ctrlEnterBtn = null;
  openActions = null;
  closeActions = null;

  modalInteractElems = null;
  firstModalElem = null;
  lastModalElem = null;
  clickOnLayout = false;
}


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


function focusOn(elem) {
  elem?.focus({preventScroll:true});
}


function onlyButtons(elems) {
  return elems.every(elem => elem.tagName === "BUTTON");
}



// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Нажали на кнопку открытия модального окна
//    =>  Открыть модальное окно
function forOpeners_onDocument_Click_Handler(evt) {
  if (!evt.target.closest("[data-modal-opener]")) return;
  evt.preventDefault();

  let modal = document.querySelector("#" + evt.target.dataset.targetModalId);

  openModal(modal, evt);
}


// Нажали "Назад" в браузере
//    =>  Закрыть модальное окно
function forModal_onWindow_Popstate_Handler() {
  if (openedModal === null) return;

  closeModal(openedModal);
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

  closeModal(openedModal);
}


// В открытом модальном окне кликнули на кнопку "Закрыть"
//    =>  Закрыть модальное окно
function forCloseBtn_onModal_Click_Handler(evt) {
  if (evt.target.dataset.closeBtn === undefined) return;

  closeModal(openedModal);
}


// При открытом модальном окне нажали "Escape"
//   =>  Закрыть модальное окно
function document_Keydown_Escape_Handler(evt) {
  if (evt.code !== "Escape") return;

  closeModal(openedModal);
}


// В открытом модальном окне нажали "Ctrl+Enter"
//    =>  Нажать кнопку "Ctrl+Enter Button"
function forCtrlEnterBtn_onDocument_Keydown_CtrlEnter_Handler(evt) {
  if (!evt.ctrlKey) return;
  if (evt.code !== "Enter" && evt.code !== "NumpadEnter") return;

  evt.preventDefault();
  ctrlEnterBtn?.click();
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