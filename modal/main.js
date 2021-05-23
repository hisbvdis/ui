"use strict";

/* Значение атрибута "data-trigger" для кнопки, вызывающей модальное окно */
let openedModal = null;
let closeBtn = null;
let actionBtn = null;
let enterBtn = null;
let modalScrim = null;

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
  modalScrim = modal.querySelector(".modal__scrim");
  closeBtn = modal.querySelector("[data-close-btn]");
  enterBtn = modal.querySelector("[data-enter-btn]");
  actionBtn = modal.querySelector(".js-modalActionBtn");
  
  // Добавление обработчиков модального окна
  modalScrim.addEventListener("click", modalScrim_Click_Handler);
  closeBtn.addEventListener("click", closeBtn_Click_Handler);
  document.addEventListener("keydown", forModal_Document_Keydown_Escape_Handler);
  document.addEventListener("keydown", forModal_Document_Keydown_CtrlEnter_Handler);
  if (enterBtn !== null) {
    document.addEventListener("keydown", forModal_Document__Keydown_Enter_Handler);
  }
}


// Закрыть модальное окно
function closeModal(modal) {
  modal.classList.remove("modal--opened");
  document.body.classList.remove("body--modalOpened");

  // Переход назад или удаление хеша (в зав-ти от наличия "объекта состояния")
  if (history.state === null) {
    history.replaceState(null, "", " ");
  } else {
    history.back();
  }

  // Удаление обработчиков модального окна
  modal.removeEventListener("click", modalScrim_Click_Handler);
  modal.removeEventListener("click", closeBtn_Click_Handler);
  document.removeEventListener("keydown", forModal_Document_Keydown_Escape_Handler);
  document.removeEventListener("keydown", forModal_Document_Keydown_CtrlEnter_Handler);
  if (enterBtn !== null) {
    document.removeEventListener("keydown", forModal_Document__Keydown_Enter_Handler, {once: true});
  }

  // Удаление глобальных переменных для окна и его элементом
  openedModal = null;
  actionBtn = null;
  closeBtn = null;
  enterBtn = null;
}



// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
// Если нажали на кнопку открытия модального окна
//    =>  Открыть модальное окно
function forModalOpener_Document_Click_Handler(evt) {
  if (("modalOpener" in evt.target.dataset) === false) return;
  
  let modalId = evt.target.dataset.target;
  let modal = document.querySelector("#" + modalId);

  evt.preventDefault();
  openModal(modal);
}


// Если в открытом модальном окне нажали "Ctrl+Enter"
//    =>  Нажать кнопку действия модального окна
// ??? Не очень хорошая реализация вроде
function forModal_Document_Keydown_CtrlEnter_Handler(evt) {
  if (evt.ctrlKey && evt.code === "Enter" || evt.code === "NumpadEnter") {
    actionBtn.click();
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


// Если нажали указателем на внешней области модального окна
//    =>  Закрыть модальное окно
function modalScrim_Click_Handler(evt) {
  // Если был клик мышью, но не ЛКМ, остановить дальнейшее выполнение
  if (evt.which !== 1) return;
  
  closeModal(openedModal);
}

// Если нажали Enter (а в модалке есть кнопка ".js-modalByEnterCloseBtn")
//    =>  Закрыть модальное окно
function forModal_Document__Keydown_Enter_Handler(evt) {
  if (evt.type === "keydown" && evt.code === "Enter" || evt.code === "NumpadEnter") {
    closeModal(openedModal);
  }
}


// Если нажали Назад/Вперёд в браузере
//    =>  Показать/скрыть модальное окно
function forModal_Window_Popstate_Handler() {
  if (openedModal !== null) {
    closeModal(openedModal);
  }
}