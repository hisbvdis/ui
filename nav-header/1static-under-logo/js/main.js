var page = document.querySelector('.page');
var navBtn = document.querySelector('.navBtn');


// Для скрытия навигации в мобильной версии и определения срабатывания JS, у навигации:
//  - удалить класс "navOpened" для скрытия контента в мобильной версии
//  - удалить класс "no-js" для определения срабатывания JS
function navOpenedRemove() {
  page.classList.remove('noJS');
  page.classList.remove('navOpened');
}
document.onload = navOpenedRemove();


// При нажатии на кнопку навигации, переключать класс ".navOpened"
navBtn.addEventListener('click', function(e) {
  page.classList.toggle('navOpened');
})