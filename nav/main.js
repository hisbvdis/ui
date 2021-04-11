var nav = document.querySelector('.nav');
var navBtn = document.querySelector('.navBtn');


// Для скрытия навигации в мобильной версии и определения срабатывания JS, у навигации:
//  - удалить класс "nav--opened" для скрытия контента в мобильной версии
//  - удалить класс "no-js" для определения срабатывания JS
function navOpenedRemove() {
  nav.classList.remove('nav--noJS');
  nav.classList.remove('nav--opened');
}
document.onload = navOpenedRemove();


// При нажатии на кнопку навигации, переключать класс ".nav--opened"
navBtn.addEventListener('click', function(e) {
  nav.classList.toggle('nav--opened');
})