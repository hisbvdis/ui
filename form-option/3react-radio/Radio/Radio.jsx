const Radio = ({className="", label="", name, value, state:[stateValue, setState]}) => {
  return (<>
    <label className={`radio  ${className}`}>
      <input
        className="radio__input"
        type="radio"
        name={name}
        value={value}
        checked={stateValue === value}
        onChange={() => setState(value)}/>
      {label && <span>{label}</span>}
    </label>
  </>)
}

export default Radio;