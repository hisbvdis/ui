import React from "react";
import "./App.css";

class App extends React.Component {
  // 1. Состояние компонента
  // 1.1. Задано не в конструкторе, а в поле класса
  state = {
    input1: "",
    input2: "",
    textarea: "",
    checkbox1: false,
    checkbox2: false,
    checkboxGroup: {},
    inputGroup: {},
    radioGroup: "first",
    select: ""
  }


  // 2. Обработчик полей с примитивными значениями
  handleChange = (evt) => {
    // 2.1. Деструктурировать объект "evt.target"
    const {name, value, type, checked} = evt.target;

    // 2.2. Измененить значение поля в зависимости от его типа
    if (type === "checkbox") {
      // Если поле — чекбокс, задать его состояние "включено/выключено"
      this.setState({[name]: checked})
    } else {
      // В остальных случаях — задать "содержимое поля"
      this.setState({[name]: value})
    }
  }


  // 3. Обработчик полей со значениями, являющимися объектами
  handleObjectChange = (evt, groupName) => {
    // 3.1. Деструктурировать объект "evt.target"
    const {name, value, type, checked} = evt.target;
    // 3.2. Скопировать объект из состояния
    const obj = Object.assign(this.state[groupName]);
    
    // 3.3. Изменить значение в зависимости от типа
    if (type === "checkbox") {
      // Если поле — чекбокс, задать его состояние "включено/выключено"
      obj[value] = checked;
    } else {
      // В остальных случаях — задать "содержимое поля"
      obj[name] = value;
    }

    // 3.4. Обновить состояние, подставив новый объект
    this.setState({[groupName]: obj})
  }

  render() {
    return (
      <form>
        <h4>Поля Input (отдельные свойства)</h4>
        <input
          type="text"
          name="input1"
          value={this.state.input1}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="input2"
          value={this.state.input2}
          onChange={this.handleChange}
        />


        <h4>Textarea (одно свойство)</h4>
        <textarea
          name="textarea"
          value={this.state.textarea}
          onChange={this.handleChange}
        />


        <h4>Checkbox (отдельные свойства)</h4>
        <input
          type="checkbox"
          name="checkbox1"
          value="checkbox1"
          checked={this.state.checkbox1}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="checkbox2"
          value="checkbox2"
          checked={this.state.checkbox2}
          onChange={this.handleChange}
        />


        <h4>Checkbox (объект)</h4>
        <input
          type="checkbox"
          name="checkboxGroup"
          value="group1-checkbox1"
          checked={this.state.checkboxGroup["group1-checkbox1"]}
          onChange={(evt) => this.handleObjectChange(evt, "checkboxGroup")}
        />
        <input
          type="checkbox"
          name="checkboxGroup"
          value="group1-checkbox2"
          checked={this.state.checkboxGroup["group1-checkbox2"]}
          onChange={(evt) => this.handleObjectChange(evt, "checkboxGroup")}
        />


        <h4>Текстовые поля (объект)</h4>
        <input
          type="text"
          name="ig1"
          value={this.state.inputGroup["ig1"]}
          onChange={(evt) => this.handleObjectChange(evt, "inputGroup")}
        />
        <input
          type="text"
          name="ig2"
          value={this.state.inputGroup["ig2"]}
          onChange={(evt) => this.handleObjectChange(evt, "inputGroup")}
        />


        <h4>Группа Radio (одно свойство)</h4>
        <input
          type="radio"
          name="radioGroup"
          value="first"
          checked={this.state.radioGroup === "first"}
          onChange={this.handleChange}
        />
        <input
          type="radio"
          name="radioGroup"
          value="second"
          checked={this.state.radioGroup === "second"}
          onChange={this.handleChange}
        />


        <h4>Select (одно свойство)</h4>
        <select name="select" value={this.state.select} onChange={this.handleChange}>
          <option value=""></option>
          <option value="first">First</option>
          <option value="second">Second</option>
        </select>
      </form>
    )
  }
}

export default App;