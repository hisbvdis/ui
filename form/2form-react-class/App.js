import React from "react";
import "./App.css";

class App extends React.Component {
  // 1. Поля класса (вместо конструктора)
  state = {
    input1: "",
    input2: "",
    textarea: "",
    checkbox1: false,
    checkbox2: false,
    checkboxGroup: {
      cb1: false,
      cb2: false,
    },
    radioGroup: "first",
    select: ""
  }

  // Обработчик примитивных значений состояния
  handleChange = (evt) => {
    // Деструктурировать объект "evt.target"
    const {name, value, type, checked} = evt.target;

    // Измененить значение в зависимости от типа
    if (type === "checkbox") {
      this.setState({[name]: checked})
    } else {
      this.setState({[name]: value})
    }
  }

  // Обработчик значений состояния, являющихся объектами
  handleObjectChange = (evt) => {
    // Деструктурировать объект "evt.target"
    const {name, value, type, checked} = evt.target;
    // Скопировать объект из состояния
    const obj = Object.assign(this.state.checkboxGroup);
    
    // Изменить значение в зависимости от типа
    if (type === "checkbox") {
      obj[name] = checked;
    } else {
      obj[name] = value;
    }

    // Обновить состояние, подставив новый объект
    this.setState({checkboxGroup: obj})
  }

  render() {
    return (
      <form>
        <h4>Input — текстовые поля</h4>
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

        <h4>Textarea — область ввода</h4>
        <textarea
          name="textarea"
          value={this.state.textarea}
          onChange={this.handleChange}
        />

        <h4>Checkbox — хранение в состоянии в виде примитивов true/false</h4>
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

        <h4>Checkbox — хранение в состоянии в виде объекта</h4>
        <input
          type="checkbox"
          name="cb1"
          value="cb1"
          checked={this.state.checkboxGroup["cb1"]}
          onChange={this.handleObjectChange}
        />
        <input
          type="checkbox"
          name="cb2"
          value="cb2"
          checked={this.state.checkboxGroup["cb2"]}
          onChange={this.handleObjectChange}
        />

        <h4>Radio — группа элементов</h4>
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

        <h4>Select — выпадающее поле</h4>
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