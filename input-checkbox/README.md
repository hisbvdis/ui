# Checkbox

## Дерево тегов и классов
#### HTML-разметка для элемента вне формы
- `div.checkbox` — контейнер отдельной опции
  - `input.checkbox__input` - сам "input"
  - `span.checkbox__mark` - кастомный индикатор (если таковой есть)
  - `label.checkbox__label` — название опции


#### HTML-разметка для элемента в контексте формы
- `ul.form__options` — список опций
- `li.checkbox  form__option` — контейнер отдельной опции (класс "form__option" для стилизации в форме)
  - `input.checkbox__input` - сам "input"
  - `span.checkbox__mark` - кастомный индикатор (если таковой есть)
  - `label.checkbox__label` — название опции


## HTML-разметка
**Имя поля**
- Полям формы в атрибуте `name` задавать имена (уникальные в пределах формы)
- *Пример:* `<input type="text" name="login">`

**Скрытые поля**
- Используются для хранения и отправки данных, введённых не пользователем
- Значения нужно сохранять в атрибуте "value"
- *Пример:* хранение HEX-кода для цвета, выбранного в Colorpicker

**Метка поля**
- У полей формы должны быть метки `<label>`
- Метки должны быть связанные с полем по ID или вложенностью элементов


## CSS-стилизация: Элементы формы
**Состояния**
- Стилизовать все состояния: Обычное, Наведение (hover), Фокус (focus), Нажатие (active), Отключенное (disabled)

**Состояние "disabled"**
- Стилизовать можно по селектору атрибута `[disabled]`
- Устанавливать курсор - "запрещено" (`cursor: not-allowed)

## Источники
- [ ] Sara Soueidan — "Inclusively Hiding & Styling Checkboxes and Radio Buttons" ([ссылка](https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/))
- [ ] Scott Ohara — One last time: custom styling radio buttons and checkboxes ([ссылка](https://www.scottohara.me/blog/2021/09/24/custom-radio-checkbox-again.html))