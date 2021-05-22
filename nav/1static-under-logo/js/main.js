var page = document.querySelector('.page');
var navBtn = document.querySelector('.navBtn');


// Для скрытия навигации в мобильной версии и определения срабатывания JS, у навигации:
//  - удалить класс "openedNav" для скрытия контента в мобильной версии
//  - удалить класс "no-js" для определения срабатывания JS
function navOpenedRemove() {
  page.classList.remove('noJS');
  page.classList.remove('openedNav');
}
document.onload = navOpenedRemove();


// При нажатии на кнопку навигации, переключать класс ".openedNav"
navBtn.addEventListener('click', function(e) {
  page.classList.toggle('openedNav');
})