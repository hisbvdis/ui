import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = ({className, children, ...props}) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  );
}

export default Button;