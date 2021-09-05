# **Элементы изображений (img и picture)**

## HTML-разметка: Контентные изображения
**Вставка**
- Контентная графика должна вставляться в разметке

**Атрибуты `width` и `height`**
- Позволяют браузеру выделить нужное место ещё до загрузки изображения

**Доступное описание**
- Контентные изображения должны иметь доступное описание ёмкое описание того, что изображено на картинке
- В конце описания ставить точку для интонационной паузы при чтении скринридером

*Способы:*
- Атрибут `alt`
  - Отображается, если изображение не загрузилось
- Текст, скрытый через `srOnly`
- Атрибут `aria-label` (менее предпочтителен)

**Тег `<figcaption>`**
- Видимая подпись, содержащая дополнительную информацию об изображении: автора, ссылку на оригинал, авторские наблюдения и замечания
- Не должна повторять содержимое атрибута "alt" изображения
- Используется только внутри тега `<figure>`

**Атрибут `role`**
- Нужно указывать, что SVG-элемент является изображением
- Пример: `role="img"`

**Атрибут `load`**
- Когда загружать картинку
  - auto - решает браузер
  - eager - загружать сразу (для очень важных картинок)
  - lazy - загружать по мере приближения к области видимости (для картинок за пределами первого экрана)
- Пример: `load="lazy"`


## Стилизация CSS: Контентные изображения
**Фон под изображением**
- Полезно задавать фон под изображением
- Если над изображениями есть текст, его можно будет прочитать ещё до загрузки изображения


## HTML-разметка: Декоративные Изображения
**Вставка**
- Декоративная графика должна вставляться в стилях через `background`
- Декоративная SVG-графика может использоваться в разметке, если её внешний вид нужно менять стилями.

**Тег `<div>`**
- Можно использовать не `<img>`, а обычный `<div>`

**Атрибут `background-image`**
- Можно добавлять картинку в виде фона элемента
- Пример: `background-image: url("cat.avif")`

**Атрибут `alt`**
- Добавлять атрибут, но оставлять пустым

**Атрибут `role`**
- Нужно указать, что элемент предназначен для визуального взаимодействия и не является интерактивным
- Пример: `role="presentation"`

**Атрибут `aria-hidden`**
- Скрывает элемент из дерева доступности
- Пример: `aria-hidden="true"`


## Другое
**Ускорение загрузки картинок (для очень важных)**
- По умолчанию картинки грузятся с приоритетом "low" (низкий)
- Можно сказать браузеру заранее загрузить картинку
- Пример: `<link rel="preload" as="image" href="cat.jpg"/>`


## Источники
- [Никита Дубко — img](https://www.youtube.com/watch?v=WfzKd16LplI)