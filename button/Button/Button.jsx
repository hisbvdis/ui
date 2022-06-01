import "./Button.css";

const Button = ({className="", children, type="button", disabled=false, onClick}) => {
  return (
    <button
      className={`button  ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;