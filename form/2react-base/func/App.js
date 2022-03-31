import { useState } from "react";
import "./App.css";

const App = () => {
  // 1. Состояние компонента
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [textarea, setTextarea] = useState("");
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkboxGroup, setCheckboxGroup] = useState({});
  const [inputGroup, setInputGroup] = useState({});
  const [radioGroup, setRadioGroup] = useState("first");
  const [select, setSelect] = useState("");
  const [multipleSelect, setMultipleSelect] = useState([]);

  return (
    <form>
      <h4>Поля Input (отдельные свойства)</h4>
      <input
        type="text"
        name="input1"
        value={input1}
        onChange={(evt) => setInput1(evt.target.value)}
      />
      <input
        type="text"
        name="input2"
        value={input2}
        onChange={(evt) => setInput2(evt.target.value)}
      />


      <h4>Textarea (одно свойство)</h4>
      <textarea
        name="textarea"
        value={textarea}
        onChange={(evt) => setTextarea(evt.target.value)}
      />


      <h4>Checkbox (отдельные свойства)</h4>
      <input
        type="checkbox"
        name="checkbox1"
        value="checkbox1"
        checked={checkbox1}
        onChange={() => setCheckbox1(!checkbox1)}
      />
      <input
        type="checkbox"
        name="checkbox2"
        value="checkbox2"
        checked={checkbox2}
        onChange={() => setCheckbox2(!checkbox2)}
      />


      <h4>Checkbox (объект)</h4>
      <input
        type="checkbox"
        name="checkboxGroup"
        value="cb1"
        checked={checkboxGroup["cb1"]}
        onChange={(evt) => {
          setCheckboxGroup({
            ...checkboxGroup,
            [evt.target.value]: !checkboxGroup[evt.target.value]
          })
        }}
      />
      <input
        type="checkbox"
        name="checkboxGroup"
        value="cb2"
        checked={checkboxGroup["cb2"]}
        onChange={(evt) => {
          setCheckboxGroup({
            ...checkboxGroup,
            [evt.target.value]: !checkboxGroup[evt.target.value]
          })
        }}
      />


      <h4>Текстовые поля (объект)</h4>
      <input
        type="text"
        name="ig1"
        value={inputGroup["ig1"]}
        onChange={(evt) => setInputGroup({
          ...inputGroup,
          [evt.target.name]: evt.target.value
        })}
      />
      <input
        type="text"
        name="ig2"
        value={inputGroup["ig2"]}
        onChange={(evt) => setInputGroup({
          ...inputGroup,
          [evt.target.name]: evt.target.value
        })}
      />


      <h4>Группа Radio (одно свойство)</h4>
      <input
        type="radio"
        name="radioGroup"
        value="first"
        checked={radioGroup === "first"}
        onChange={(evt) => setRadioGroup(evt.target.value)}
      />
      <input
        type="radio"
        name="radioGroup"
        value="second"
        checked={radioGroup === "second"}
        onChange={(evt) => setRadioGroup(evt.target.value)}
      />


      <h4>Select (одно свойство)</h4>
      <select name="select" value={select} onChange={(evt) => setSelect(evt.target.value)}>
        <option value=""></option>
        <option value="first">First</option>
        <option value="second">Second</option>
      </select>


      <h4>Select Multiple — массив</h4>
      <select
        multiple={true}
        name="multipleSelect"
        value={multipleSelect}
        onChange={(evt) => {
          // Выбрать у данного данного <select> дочерние элементы <option>,
          // ..которые выбраны (:checked)
          const selectedNodes = evt.target.querySelectorAll("option:checked");
          // Преобразовать итерируемый объект в массив
          const array = Array.from(selectedNodes)
          // Перебрать массив, вернув лишь свойство "value"
          const values = array.map(item => item.value);
          // Записать в состояние новый массив
          setMultipleSelect(values);
        }}
      >
        <option value=""></option>
        <option value="first">First</option>
        <option value="second">Second</option>
      </select>
    </form>
  )
}

export default App;