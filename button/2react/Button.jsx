import "./Button.css";

const Button = ({className="", children, type="button", disabled, onClick}) => {
  return (<>
    <button
      className={`button  ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  </>)
}

export default Button;