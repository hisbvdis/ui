# Элемент HEAD

## Последовательность подключения ресурсов
[Источник](https://twitter.com/smashingmag/status/1440697011985018881)
```html
  <meta />
  <title>
  preconnect
  <script async></script>
  CSS with 
  @imports

  sync JS
  sync CSS
  preload
  <script defer></script>
  prefetch / prerender
  Всё остальное (SEO, icons, open graph)
```

## Подключение стилей
**Подключение**
- Файлы стилей подключать только через тег `<link rel="stylesheet">`
- Не должно быть инлайновых стилей в атрибуте `style` или в теге `<style>`

**Количество**
- Собственные стили подключать одним файлом "style.css", содержащим импорт других стилей
- Сторонние стили подключать отдельными файлами

**Очерёдность**
- Сторонние стили подключать до собственных стилей


## Заголовок страницы на вкладке
**title**
- Указывать тег `<title>` с заголовком страницы


## Фавиконка
- Описана в разделе ui-элементов "favicon"


## Источники
- [ ] Используйте фавиконки правильно ([Используйте фавиконки правильно](https://habr.com/ru/company/htmlacademy/blog/578224/))