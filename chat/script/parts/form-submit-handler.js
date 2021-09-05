import { form } from "./selectors.js";
import { sendMessage } from "./send-message.js";


form.addEventListener("submit", onForm_Submit_Handler);


function onForm_Submit_Handler(evt) {
  evt.preventDefault();
  sendMessage();
}