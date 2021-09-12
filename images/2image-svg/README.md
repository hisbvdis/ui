# **Элементы изображений (SVG)**

## HTML-разметка: Контентные изображения
**Роль**
- Если внутри SVG-контентное изображение, важно указать роль
- Пример: `<svg role="img">...</svg>`

**Доступное описание**
- Задавать описание SVG-элемента в `alt` нельзя, поэтому только в атрибуте `aria-label`
- Пример: `<svg aria-label="Описание">...</svg>`

**Доступное подробное описание**
- Если на SVG много информации, её можно подробно описать внутри `<svg>` в элементе `<desc>`, а из `<svg>` указать `id` в атрибуте `aria-described-by`
- Пример:
```html
  <svg aria-label="Описание" aria-described-by="desc">
    <desc id="desc">Подробное описание графического элемента.</desc>
  </svg>
```


## HTML-разметка: Декоративные Изображения
**Вставка**
- Декоративная SVG-графика может использоваться в разметке, если её внешний вид нужно менять стилями.


## Другое
**Ускорение загрузки картинок (для очень важных)**
- По умолчанию картинки грузятся с приоритетом "low" (низкий)
- Можно сказать браузеру заранее загрузить картинку
- Пример: `<link rel="preload" as="image" href="cat.jpg"/>`


## Источники
- [x] [Никита Дубко — img](https://www.youtube.com/watch?v=WfzKd16LplI)