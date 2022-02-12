# Элементы изображений (img / picture / svg)

## Контентные изображения
### HTML-разметка: Контентные изображения
**Вставка**
- Контентная графика должна вставляться в разметке

**Размеры**
- Позволяют браузеру выделить нужное место ещё до загрузки изображения

**Доступное описание**
- Обязательно указывать атрибут `alt` с ёмким описанием того, что изображено на картинке
  - Содержимое атрибута отображается, если изображение не загрузилось
- В конце описания ставить точку для интонационной паузы при чтении скринридером
- Если нет возможности указать описание, всё равно добавлять атрибут `alt`, но оставлять пустым (иначе скринридер может озвучить URL-адрес)
- В SVG-элементах нет возможности задать описание в `alt`, поэтому только в атрибуте `aria-label`

**Информация об изображении**
- Видимая подпись, содержащая дополнительную информацию об изображении: автора, ссылку на оригинал, авторские наблюдения и замечания
- Не должна повторять содержимое атрибута "alt" изображения
- Используется только внутри тега `<figure>`
- Пример:
```html
  <figure>
    <img src="cat.jpg">
    <figcaption>Фотография автора Ивана Иванова</figcaption>
  </figure>
```

**Атрибут `load`**
- Когда загружать картинку
  - auto - решает браузер
  - eager - загружать сразу (для очень важных картинок)
  - lazy - загружать по мере приближения к области видимости (для картинок за пределами первого экрана)
- Пример: `load="lazy"`

**SVG: Роль**
- Если внутри SVG находится контентное (важное) изображение, важно указать роль
- Пример: `<svg role="img">...</svg>`

**SVG: Доступное подробное описание**
- Если на SVG много информации, её можно подробно описать внутри `<svg>` в элементе `<desc>`, а из `<svg>` указать `id` в атрибуте `aria-described-by`
- Пример:
```html
  <svg aria-label="Описание" aria-described-by="desc">
    <desc id="desc">Подробное описание графического элемента.</desc>
  </svg>
```


### CSS-стилизмция: Контентные изображения
**Фон под изображением**
- Полезно задавать фон под изображением
- Если над изображениями есть текст, его можно будет прочитать ещё до загрузки изображения

**Картинка не загрузилась**
- Если картинка не загрузилась, браузеры вместо неё подставляют "Shadow DOM", поэтому можно добавлять псевдоэлемент `::before` и `::after`
- Стилизация текста для элемента `<img>` наследутеся текстом псевдоэлементов
- Можно стилизовать иконку и подпись в "Shadow DOM"
- Стили в CSS-файле


## Декоративные Изображения
### HTML-разметка: Декоративные Изображения
**Вставка избражения**
- Декоративная графика вставляется в виде фона через CSS
- SVG можно использовать прямо HTML-разметке, если его внешний вид нужно менять стилями
- Пример: `background-image: url("cat.avif")`

**Тег**
- Можно использовать не `<img>`, а обычный `<div>`

**Пустое описание**
- Обязательно добавлять атрибут `alt`, но оставлять пустым, чтобы скрыть изображение от скринридеров

**Роль**
- Можно указать, что элемент предназначен для визуального взаимодействия и не является интерактивным
- Пример: `role="presentation"`

**Скрытие от скринридеров**
- Декоративные элементы нужно скрывать из дерева доступности (от скринридеров) с помощью `aria-hidden="true"`

**SVG: Файл (заливка)**
- В коде SVG-файла удалить атрибуты `fill` и управлять цветом иконок через CSS-свойство `fill`


## Другое
**Ускорение загрузки картинок (для очень важных)**
- По умолчанию картинки грузятся с приоритетом "low" (низкий)
- Можно сказать браузеру заранее загрузить картинку
- Пример: `<link rel="preload" as="image" href="cat.jpg"/>`


## Источники
- [x] [Никита Дубко — img](https://www.youtube.com/watch?v=WfzKd16LplI)