# Адаптивная навигация

**Разное**
- Кнопку открытия/закрытия панели навигации лучше делать абсолютно позиционированной, чтобы при добавлении в `header` навигации ещё какого-то НЕ абсолютно позиционированного элемента, не нарушалось расположение элементов

**Скрытие/отображение навигации на мобильных**
CSS:
- Для блока с содержимым навигации `.nav__content` только для мобильной версии задаётся `display: none`, но если у родительской навигации есть модификатор отображения `.nav--opened`, то `display: block`

JS:
- При загрузке документа удалять у элемента навигации класс `.nav--opened`, чтобы элемент с содержимым  скрывался
- Нажатие на кнопку навигации переключает (удаляет/добавляет) наличие у навигации класса `.nav--opened`

**Скрытие кнопки "навигация", если JS не сработал**
CSS:
- Для кнопки навигации `.navBtn` только для мобильной версии задаётся `display: block;`, а если родительская навигация содержит модификатор того, что JS не сработал `.nav--noJS`, скрывать кнопку `display: none;`

JS:
- При загрузке документа удалять у элемента навигации класс `.nav--noJS`, чтобы определить, что JS работает