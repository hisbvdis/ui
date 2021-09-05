import { input, submitBtn } from "./selectors.js";
import { sendMessage } from "./send-message.js";


input.addEventListener("focus", oninput_Focus_Handler);


function oninput_Focus_Handler() {
  window.addEventListener("keydown", forForm_onWindow_Keydown_Handler);
  input.addEventListener("blur", oninput_Blur_Handler);
}


function oninput_Blur_Handler() {
  window.removeEventListener("keydown", forForm_onWindow_Keydown_Handler);
  input.removeEventListener("blur", oninput_Blur_Handler);
}


function forForm_onWindow_Keydown_Handler (evt) {
  if (evt.code !== "Enter" && evt.code !== "NumpadEnter") return;

  if (evt.ctrlKey) {
    submitBtn.click();
  }
}