"use strict";

/* Значение атрибута "data-trigger" для кнопки, вызывающей модальное окно */
let openedModal = null;
let closeBtn = null;
let ctrlEnterBtn = null;
let enterBtn = null;
let scrim = null;
let mousedownTargetIsScrim = null;

// Обработчики для функционирования модального окна:
// - нажатие на кнопки, открывающие модальное окно
document.addEventListener("click", forModalOpener_Document_Click_Handler);
// - открытие модального окна при нажатии "назад/вперёд"
window.addEventListener("popstate", forModal_Window_Popstate_Handler);



// =================================================================
// ФУНКЦИИ
// =================================================================
// Открыть модальное окно
function openModal(modal) {
  modal.classList.add("modal--opened");
  document.body.classList.add("modalOpened");

  // Добавление новой записи в историю при открытии окна
  history.pushState({fromSite: true}, "", "");
  
  // Назначение глобальных переменных для окна и его элементов
  openedModal = modal;
  scrim = modal.querySelector(".modal__scrim");
  closeBtn = modal.querySelector("[data-close-btn]");
  enterBtn = modal.querySelector("[data-enter-btn]");
  ctrlEnterBtn = modal.querySelector("[data-ctrl-enter-btn]");
  
  // Добавление обработчиков модального окна
  scrim.addEventListener("mousedown", scrim_Mousedown_Handler);
  scrim.addEventListener("click", scrim_Click_Handler);
  closeBtn.addEventListener("click", closeBtn_Click_Handler);
  document.addEventListener("keydown", forModal_Document_Keydown_Escape_Handler);
  document.addEventListener("keydown", forModal_Document_Keydown_Enter_Handler);
  document.addEventListener("keydown", forModal_Document_Keydown_CtrlEnter_Handler);
}


// Закрыть модальное окно
function closeModal(modal) {
  modal.classList.remove("modal--opened");
  document.body.classList.remove("modalOpened");

  // Переход назад или удаление хеша (в зав-ти от наличия "объекта состояния")
  if (history.state === null) {
    history.replaceState(null, "", " ");
  } else {
    history.back();
  }

  // Удаление обработчиков модального окна
  scrim.removeEventListener("click", scrim_Click_Handler);
  scrim.removeEventListener("mousedown", scrim_Mousedown_Handler);
  closeBtn.removeEventListener("click", closeBtn_Click_Handler);
  document.removeEventListener("keydown", forModal_Document_Keydown_Escape_Handler);
  document.removeEventListener("keydown", forModal_Document_Keydown_Enter_Handler);
  document.removeEventListener("keydown", forModal_Document_Keydown_CtrlEnter_Handler);

  // Удаление глобальных переменных для окна и его элементом
  openedModal = null;
  scrim = null;
  closeBtn = null;
  enterBtn = null;
  ctrlEnterBtn = null;
}



// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Если нажали на кнопку открытия модального окна
//    =>  Открыть модальное окно
function forModalOpener_Document_Click_Handler(evt) {
  if ( !evt.target.dataset.hasOwnProperty("modalOpener") ) return;
  
  let selector = evt.target.dataset.target;
  let modal = document.querySelector(selector);

  evt.preventDefault();
  openModal(modal);
}


// Если нажали Назад/Вперёд в браузере
//    =>  Показать/скрыть модальное окно
function forModal_Window_Popstate_Handler() {
  if (openedModal !== null) {
    closeModal(openedModal);
  }
}


// Если надавили ЛКМ
//    => Проверить и записать, является ли целевой элемент подложкой
function scrim_Mousedown_Handler(evt) {
  if (evt.which !== 1) return;

  mousedownTargetIsScrim = evt.target.classList.contains("modal__scrim");
}


// Если нажали указателем на внешней области модального окна
//    =>  Закрыть модальное окно
function scrim_Click_Handler(evt) {
  if (evt.which !== 1) return;
  if (!mousedownTargetIsScrim) return;

  if (evt.target.classList.contains("modal__scrim")) {
    closeModal(openedModal);
  }
}


// Если в открытом модальном окне кликнули на кнопку "Закрыть"
//    =>  Закрыть модальное окно
function closeBtn_Click_Handler(evt) {
  closeModal(openedModal);
}


// Если при открытом модальном окне нажали "Escape"
//   =>  Закрыть модальное окно
function forModal_Document_Keydown_Escape_Handler(evt) {
  if (evt.code === "Escape") {
    closeModal(openedModal);
  }
}


// Если нажали Enter (а в модалке есть кнопка ".js-modalByEnterCloseBtn")
//    =>  Закрыть модальное окно
function forModal_Document_Keydown_Enter_Handler(evt) {
  if (evt.type === "keydown" && evt.code === "Enter" || evt.code === "NumpadEnter") {
    enterBtn?.click();
  }
}


// Если в открытом модальном окне нажали "Ctrl+Enter"
//    =>  Нажать кнопку действия модального окна
function forModal_Document_Keydown_CtrlEnter_Handler(evt) {
  if (evt.ctrlKey && evt.code === "Enter" || evt.code === "NumpadEnter") {
    ctrlEnterBtn?.click();
  }
}