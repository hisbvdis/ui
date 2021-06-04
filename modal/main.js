"use strict";

let openedModal = null;
let ctrlEnterBtn = null;
let downOnBackdrop = false;
let modalTrigger = null;
let modalElems = null;
let firstModalElem = null;
let lastModalElem = null;
let onCloseActions = null;

// Обработчики для функционирования модального окна:
// - нажатие на кнопки, открывающие модальное окно
document.addEventListener("click", forModalOpener_Document_Click_Handler);
// - открытие модального окна при нажатии "назад/вперёд" в браузере
window.addEventListener("popstate", forModal_Window_Popstate_Handler);


// =================================================================
// ФУНКЦИИ
// =================================================================
// Открыть модальное окно
function openModal(modal, trigger, onClose) {
  // У <body> задать класс модального окна (прокрутка и отступ)
  document.body.classList.add("modalOpened");
  
  // Показать подальное окно
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("tabindex", "0");
  modal.classList.remove("modal--hidden");

  // Работа с фокусом окна
  modalElems = getModalElems(modal);
  firstModalElem = modalElems[0];
  lastModalElem = modalElems[modalElems.length - 1];
  if (onlyButtons(modalElems)) {
    focusOn(modal.querySelector("[data-focus]"));
  } else {
    focusOn(firstModalElem);
  }
  
  // Добавить в историю браузера новую запись с определённым названием
  history.pushState("fromSite", "");

  // Назначение глобальных переменных для окна и его элементов
  openedModal = modal;
  modalTrigger = trigger;
  onCloseActions = onClose;
  ctrlEnterBtn = modal.querySelector("[data-ctrl-enter-btn]");

  // Добавление обработчиков модального окна
  modal.addEventListener("pointerdown", backdrop_Pointerdown_Handler);
  modal.addEventListener("click", backdrop_Click_Handler);
  modal.addEventListener("click", forCloseBtn_Modal_Click_Handler);
  firstModalElem.addEventListener("keydown", firstModalElem_Keydown_Tab_Handler);
  lastModalElem.addEventListener("keydown", lastModalElem_Keydown_ShiftTab_Handler);
  document.addEventListener("keydown", document_Keydown_Escape_Handler);
  document.addEventListener("keydown", forCtrlEnterBtn_Document_Keydown_CtrlEnter_Handler);
}


// Закрыть модальное окно
function closeModal(modal) {
  // У <body> удалить класс модального окна
  document.body.classList.remove("modalOpened");
  
  // Скрыть модальное окно
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("tabindex", "-1");
  modal.classList.add("modal--hidden");
  
  // Переход "назад" в истории так, чтобы не создавать дубликаты в истории
  history.state ? history.back() : history.replaceState(null, "");

  // Фокус на элементе, вызвавшем модальное окно
  modalTrigger.focus();

  // Удаление обработчиков модального окна
  modal.removeEventListener("pointerdown", backdrop_Pointerdown_Handler);
  modal.removeEventListener("click", backdrop_Click_Handler);
  modal.removeEventListener("click", forCloseBtn_Modal_Click_Handler);
  firstModalElem.removeEventListener("keydown", firstModalElem_Keydown_Tab_Handler);
  lastModalElem.removeEventListener("keydown", lastModalElem_Keydown_ShiftTab_Handler);
  document.removeEventListener("keydown", document_Keydown_Escape_Handler);
  document.removeEventListener("keydown", forCtrlEnterBtn_Document_Keydown_CtrlEnter_Handler);

  // Удаление глобальных переменных для окна и его элементом
  openedModal = null;
  ctrlEnterBtn = null;
  modalTrigger = null;
  modalElems = null;
  firstModalElem = null;
  lastModalElem = null;

  // Выполнение команд закрытия окна, которые были переданы при его открытии
  onCloseActions?.forEach(action => action);
}


function getModalElems(modal) {
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
// Если нажали на кнопку открытия модального окна
//    =>  Открыть модальное окно
function forModalOpener_Document_Click_Handler(evt) {
  if (!evt.target.dataset.modal) return;
  evt.preventDefault();
  
  let id = evt.target.dataset.modal;
  let modal = document.querySelector("#" + id);

  openModal(modal, evt.target);
}


// Если нажали "Назад" в браузере
//    =>  Закрыть модальное окно
function forModal_Window_Popstate_Handler() {
  if (openedModal === null) return;
  
  closeModal(openedModal);
}


// Если надавили ЛКМ
//    => Проверить и записать, является ли целевой элемент подложкой
function backdrop_Pointerdown_Handler(evt) {
  if (evt.which !== 1) return;

  downOnBackdrop = evt.target.classList.contains("modal");
}


// Если нажали на фон модального окна
//    =>  Закрыть модальное окно
function backdrop_Click_Handler(evt) {
  if (evt.which !== 1) return;
  if (downOnBackdrop === false) return;
  if (!evt.target.classList.contains("modal")) return;

  closeModal(openedModal);
}


// Если в открытом модальном окне кликнули на кнопку "Закрыть"
//    =>  Закрыть модальное окно
function forCloseBtn_Modal_Click_Handler(evt) {
  if (evt.target.dataset.closeBtn === undefined) return;

  closeModal(openedModal);
}


// Если при открытом модальном окне нажали "Escape"
//   =>  Закрыть модальное окно
function document_Keydown_Escape_Handler(evt) {
  if (evt.code !== "Escape") return;
 
  closeModal(openedModal);
}


// Если в открытом модальном окне нажали "Ctrl+Enter"
//    =>  Нажать кнопку "Ctrl+Enter Button"
function forCtrlEnterBtn_Document_Keydown_CtrlEnter_Handler(evt) {
  if (!evt.ctrlKey) return;
  if (evt.code !== "Enter" && evt.code !== "NumpadEnter") return;

  evt.preventDefault();
  ctrlEnterBtn?.click();
}


// Если на первом элементе формы нажали Shift+Tab
//    =>  Фокус на последний элемент
function firstModalElem_Keydown_Tab_Handler(evt) {
  if (evt.code !== "Tab") return;
  if (!evt.shiftKey) return;
  evt.preventDefault();

  focusOn(lastModalElem);
}


// Если на последнем элементе формы нажали Tab
//    =>  Фокус на первый элемент
function lastModalElem_Keydown_ShiftTab_Handler(evt) {
  if (evt.code !== "Tab") return;
  if (evt.shiftKey) return;
  evt.preventDefault();

  focusOn(firstModalElem);
}