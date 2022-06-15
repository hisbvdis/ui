import "./Radio.scss";

const Radio = ({className="", children, name, value, state:[stateValue, setState]}) => {
  return (<>
    <label className={`radio ${className}`}>
      <input
        className="radio__input"
        type="radio"
        name={name}
        value={value}
        checked={stateValue === value}
        onChange={() => setState(value)}
      />
      <span className="radio__customMark"></span>
      <span className="radio__name">{children}</span>
    </label>
  </>)
}

export default Radio;