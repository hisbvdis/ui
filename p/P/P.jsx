import styles from "./P.module.css";
import clsx from "clsx";

const P = ({className, children, size="m"}) => {
  return (
    <p className={clsx(styles["p"], className)}>{children}</p>
  )
}

export default P;