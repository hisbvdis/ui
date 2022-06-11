import styles from "./Button.module.css";
import clsx from "clsx";

const Button = ({className, children, appearance="primary", arrow="none"}) => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles["button--primary"]]: appearance === "primary",
        [styles["button--ghost"]]: appearance === "ghost",
      })}
    >
      {children}
    </button>
  );
}

export default Button;