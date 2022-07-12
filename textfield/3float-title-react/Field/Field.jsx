import { useEffect, useRef, useState } from "react";
import "./Field.scss";

const Field = ({className="", id="", type="text", name="", label="", value="", disabled=false}) => {
  const [inputValue, setInputValue] = useState(value);
  const [inputFill, setInputFill] = useState("");
  const input = useRef();
  
  const setFilledStatus = () => {
    (input.current.value === "") ? setInputFill("") : setInputFill("field--filled");
  }
  
  useEffect(() => {
    setFilledStatus();
  }, [])
  
  return (
    <div className={`field ${className} ${inputFill}`}>
      {/* Важен порядок элементов: input -> label -> fieldset */}
      <input
        className="field__input"
        ref={input}
        id={id}
        type={type}
        name={name}
        onBlur={setFilledStatus}
        value={inputValue}
        onChange={(evt) => setInputValue(evt.target.value)}
        disabled={false}
      />
      <label className="field__label" htmlFor={id}>{label}</label>
      <fieldset className="field__fieldset">
        <legend className="field__legend">{label}</legend>
      </fieldset>
    </div>
  );
}

export default Field;