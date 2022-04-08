import "./Radio.css";

const Radio = ({children, name, value, state:[stateValue, setState]}) => {
  return (<>
    <label className="radio">
      <input
        className="radio__input"
        type="radio"
        name={name}
        value={value}
        checked={stateValue === value}
        onChange={() => setState(value)}/>
      <span>{children}</span>
    </label>
  </>)
}

export default Radio;