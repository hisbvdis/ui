import { openModal } from "../modal/modal.js";
const nav = document.querySelector(".nav");
const navBtn = document.querySelector(".navBtn");

navBtn.addEventListener("click", navBtn_Click_Handler);

function navBtn_Click_Handler(evt) {
  if (evt.which !== 1) return;
  
  const id = evt.target.dataset.modal;
  const modal = document.querySelector(`#${id}`);

  openModal(modal, {
    trigger: evt.target,
    openActions: [() => document.body.classList.add("navOpened")],
    closeActions: [() => document.body.classList.remove("nav--opened")]
  })
}