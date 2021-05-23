# Field - текстовое поле

**Разметка вне формы**
- **`div.field`** - элемент для отдельного поля
- **`label.field__label`** - название поля
  - Не является обёрткой для поля ввода, так как может визуально скрываться или менять положение при адаптивной стилизации
- **`p.field__control`** - обёртка для непосредственно области поля ввода "input" и элементов внутри его границ (например, иконки или кнопки)
  - **`input.field__input`** - само поле ввода "input"

**Разметка в форме**
- **`div.form__fields`** (не обязательно) - группа полей ввода
- **`div.field  form__field`** - элемент для отдельного поля
  - Дополнительный необязательный класс "form__field" используется для стилизации в форме
- **`label.field__label`** - название поля
  - Не является обёрткой для поля ввода, так как может визуально скрываться или менять положение при адаптивной стилизации
- **`p.field__control`** - обёртка для непосредственно области поля ввода "input" и элементов внутри его границ (например, иконки или кнопки)
  - **`input.field__input`** - само поле ввода "input"