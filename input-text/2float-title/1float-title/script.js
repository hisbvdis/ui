window.addEventListener("load", forFloatInput_onWindow_Load_Handler)
document.addEventListener("focusout", forFloatInput_onDocument_Focusout_Handler);


function forFloatInput_onWindow_Load_Handler() {
  const floatInputs = document.querySelectorAll("[data-js='float-input']");
  floatInputs.forEach(input => setState(input));
}


function forFloatInput_onDocument_Focusout_Handler(evt) {
  if (evt.target.dataset.js !== "float-input") return;

  const input = evt.target;

  setState(input);
}


function setState(input) {
  const field = input.closest("[data-js='field']")

  if (input.value === "") {
    field.classList.remove("field--filled");
  } else {
    field.classList.add("field--filled");
  }
}