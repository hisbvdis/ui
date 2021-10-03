# Radio

## Дерево тегов и классов
**Разметка вне формы**
- `label.radio` — контейнер отдельной опции
  - `input.radio__input` — сам "input"
  - `span.radio__mark` — кастомный индикатор (если таковой есть)
  - `span.radio__caption` — подпись элемента

**HTML-разметка для элемента в контексте формы**
- `ul.form__options` — список опций
  - `li.form__option` — элемент списка опций
    - `label.radio` — контейнер отдельной опции
      - `input.radio__input` — сам "input"
      - `span.radio__mark` — кастомный индикатор (если таковой есть)
      - `span.radio__caption` — подпись элемента


## CSS-стилизация
**Состояния**
- Стилизовать все основные состояния: обычное, отключённое, в фокусе, активное (при нажатии)


## Источники
- [ ] Sara Soueidan – "Inclusively Hiding & Styling Checkboxes and Radio Buttons" ([ссылка](https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/))
- [ ] Scott Ohara — One last time: custom styling radio buttons and checkboxes ([ссылка](https://www.scottohara.me/blog/2021/09/24/custom-radio-checkbox-again.html))