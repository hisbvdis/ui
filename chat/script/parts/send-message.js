import { messageList, input, messageTemplate } from "./selectors.js";


export function sendMessage() {
  let text = input.value;

  let newMessage = createElem(text);
  addElem(newMessage);
  scrollToEnd();
  clearinput();
}


function createElem(text) {
  let message = messageTemplate.content.cloneNode(true);
  let messageText = message.querySelector(".msg__text");

  messageText.textContent = text;

  return message;
}


function addElem(elem) {
  messageList.append(elem);
}


function scrollToEnd() {
  messageList.scrollTo(0, messageList.scrollHeight);
}


function clearinput() {
  input.value = "";
  input.focus();
}