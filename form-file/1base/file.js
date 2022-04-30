const inputFile = document.querySelector("input[type='file']");
const fileName = document.querySelector(".file__name");

inputFile.addEventListener("change", (evt) => {
  const files = evt.target.files;
  if (files.length === 0) {
    fileName.textContent = "Файл не выбран";
    fileName.classList.remove("file__name--selected");
    return;
  }

  fileName.textContent = files[0].name;
  fileName.classList.add("file__name--selected");
})