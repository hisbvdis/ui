import { openModal } from "./modal/modal.js";
const sidenavBtn = document.querySelector(".sidenavBtn");


sidenavBtn.addEventListener("click", sidenavBtn_Click_Handler);



// Нажали на кнопку "Меню"
//   => Добавить/убрать из <body> класс "sidenavOpened"
function sidenavBtn_Click_Handler(evt) {
  if (evt.which !== 1) return;

  let id = this.dataset.modal;
  let modal = document.querySelector(`#${id}`);

  // openModal(modal, {trigger: this, bodyClass: "sidenavOpened"});
  openModal(modal, {
    trigger: this,
    openActions: [() => document.body.classList.add("sidenavOpened")],
    closeActions: [() => document.body.classList.remove("sidenavOpened")],
  });
}