import "./Field.css";

const Field = ({
  className = "",
  id="",
  type="text",
  label = "",
  name="",
  value = "",
  onChange,
  errorMsg = "",
  required=false,
  placeholder="",
  shouldValidate = false,
  isTouched=false,
  isValid=false,
}) => {

  return (
    <div className={`field  ${className}  ${!isValid && "field--invalid"}`}>
      <label className="field__label" htmlFor={id}>{label}</label>
      <p className="field__inputWrapper">
        <input
          className="field__input"
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </p>
      {!isValid && (
        <p className="field__errorMsg" aria-live="polite">{errorMsg}</p>
      )}
    </div>
  );
};

export default Field;