const inputElem = document.querySelector(".field__input");
const errorElem = document.querySelector(".field__error");

inputElem.addEventListener("input", (evt) => {
  // Если поле валидно
  if (evt.target.validity.valid) {
    errorElem.textContent = "";
    errorElem.classList.remove("field__error--active");
  }
  
  // Если пустое
  else if (inputElem.validity.valueMissing) {
    errorElem.textContent = "Поле не должно быть пустым";
  }

  // Если не соответствует шаблону
  else if (inputElem.validity.typeMismatch) {
    errorElem.textContent = "Введите значение в формате name@site.com";
  }

  // Если слишком короткое
  else if (inputElem.validity.tooShort) {
    errorElem.textContent = `Минимум ${inputElem.minLength} символов. Вы ввели ${inputElem.value.length}`;
  }

  errorElem.classList.add("field__error--active");
})