window.addEventListener("load", forFloatInput_onWindow_Load_Handler)
document.addEventListener("focusout", forFloatInput_onDocument_Focusout_Handler);


function forFloatInput_onWindow_Load_Handler() {
  const floatInputs = document.querySelectorAll("[data-js='float-input']");
  floatInputs.forEach(input => {
    setFilled(input);
    setDisabled(input);
  });
}


function forFloatInput_onDocument_Focusout_Handler(evt) {
  if (evt.target.dataset.js !== "float-input") return;

  const input = evt.target;

  setFilled(input);
}


function setFilled(input) {
  const field = input.closest("[data-js='field']")

  if (input.value === "") {
    field.classList.remove("field--filled");
  } else {
    field.classList.add("field--filled");
  }
}


function setDisabled(input) {
  const field = input.closest("[data-js='field']");
  
  if (input.disabled) {
    field.classList.add("field--disabled");
  } else {
    field.classList.remove("field--disabled");
  }
}