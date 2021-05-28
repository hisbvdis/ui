"use strict";

let openedModal = null;
let enterBtn = null;
let ctrlEnterBtn = null;
let mousedownOnBackdrop = null;

// Обработчики для функционирования модального окна:
// - нажатие на кнопки, открывающие модальное окно
document.addEventListener("click", forModalOpener_Document_Click_Handler);
// - открытие модального окна при нажатии "назад/вперёд" в браузере
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
  enterBtn = modal.querySelector("[data-enter-btn]");
  ctrlEnterBtn = modal.querySelector("[data-ctrl-enter-btn]");
  
  // Добавление обработчиков модального окна
  modal.addEventListener("mousedown", backdrop_Mousedown_Handler);
  modal.addEventListener("click", backdrop_Click_Handler);
  modal.addEventListener("click", forCloseBtn_Modal_Click_Handler);
  document.addEventListener("keydown", document_Keydown_Escape_Handler);
  document.addEventListener("keydown", forEnterBtn_Document_Keydown_Enter_Handler);
  document.addEventListener("keydown", forCtrlEnterBtn_Document_Keydown_CtrlEnter_Handler);
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
  modal.removeEventListener("mousedown", backdrop_Mousedown_Handler);
  modal.removeEventListener("click", backdrop_Click_Handler);
  modal.removeEventListener("click", forCloseBtn_Modal_Click_Handler);
  document.removeEventListener("keydown", document_Keydown_Escape_Handler);
  document.removeEventListener("keydown", forEnterBtn_Document_Keydown_Enter_Handler);
  document.removeEventListener("keydown", forCtrlEnterBtn_Document_Keydown_CtrlEnter_Handler);

  // Удаление глобальных переменных для окна и его элементом
  openedModal = null;
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
  if (openedModal === null) return;
  
  closeModal(openedModal);
}


// Если надавили ЛКМ
//    => Проверить и записать, является ли целевой элемент подложкой
function backdrop_Mousedown_Handler(evt) {
  if (evt.which !== 1) return;

  mousedownOnBackdrop = evt.target.classList.contains("modal");
}


// Если нажали на фон модального окна
//    =>  Закрыть модальное окно
function backdrop_Click_Handler(evt) {
  if (evt.which !== 1) return;
  if (!mousedownOnBackdrop) return;
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


// Если нажали Enter
//    =>  Нажать кнопку "Enter Button"
function forEnterBtn_Document_Keydown_Enter_Handler(evt) {
  if (evt.type === "keydown" && evt.code === "Enter" || evt.code === "NumpadEnter") {
    enterBtn?.click();
  }
}


// Если в открытом модальном окне нажали "Ctrl+Enter"
//    =>  Нажать кнопку "Ctrl+Enter Button"
function forCtrlEnterBtn_Document_Keydown_CtrlEnter_Handler(evt) {
  if (evt.ctrlKey && evt.code === "Enter" || evt.code === "NumpadEnter") {
    ctrlEnterBtn?.click();
  }
}