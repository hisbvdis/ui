import styles from "./Button.module.css";
import clsx from "clsx";
import { ReactComponent as ArrowIcon } from "./arrow.svg";

const Button = ({className, children, appearance="primary", arrow="none"}) => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles["button--primary"]]: appearance === "primary",
        [styles["button--ghost"]]: appearance === "ghost",
      })}
    >
      {children}
      {arrow !== "none" && (
        <ArrowIcon className={clsx(styles["button__arrow"], className, {
          [styles["button__arrow--down"]]: arrow === "down"
        })} />
      )}
    </button>
  );
}

export default Button;