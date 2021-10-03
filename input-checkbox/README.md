# Checkbox

## Дерево тегов и классов
**HTML-разметка для элемента вне формы**
- `label.checkbox` — контейнер отдельной опции
  - `input.checkbox__input` — сам "input"
  - `span.checkbox__mark` — кастомный индикатор (если таковой есть)
  - `span.checkbox__caption` — подпись элемента

**HTML-разметка для элемента в контексте формы**
- `ul.form__options` — список опций
  - `li.form__option` — элемент списка опций
    - `label.checkbox` — контейнер отдельной опции
      - `input.checkbox__input` — сам "input"
      - `span.checkbox__mark` — кастомный индикатор (если таковой есть)
      - `span.checkbox__caption` — подпись элемента


## HTML-разметка
**Тип поля**
- Использовуется `input` с типом `checkbox`3

**Имя поля**
- Полям формы в атрибуте `name` задавать имена (уникальные в пределах формы)
- *Пример:* `<input type="text" name="login">`

**Скрытые поля**
- Используются для хранения и отправки данных, введённых не пользователем
- Значения нужно сохранять в атрибуте "value"
- *Пример:* хранение HEX-кода для цвета, выбранного в Colorpicker

**Подпись поля**
- У полей формы должны быть подписи `<label>`
- Подписи должны быть связанные с полем по ID или вложенностью элементов


## CSS-стилизация: Элементы формы
**Состояния**
- Стилизовать все состояния: Обычное, Наведение (hover), Фокус (focus), Нажатие (active), Отключенное (disabled), Промежуточное (indeterminate)

**Состояние "disabled"**
- Стилизовать можно по селектору атрибута `[disabled]`
- Устанавливать курсор - "запрещено" (`cursor: not-allowed)


## Источники
- [ ] Sara Soueidan — "Inclusively Hiding & Styling Checkboxes and Radio Buttons" ([ссылка](https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/))
- [ ] Scott Ohara — One last time: custom styling radio buttons and checkboxes ([ссылка](https://www.scottohara.me/blog/2021/09/24/custom-radio-checkbox-again.html))