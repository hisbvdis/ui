import styles from "./P.module.css";
import clsx from "clsx";

const P = ({className, children, size="m"}) => {
  return (
    <p className={clsx(styles.p, className, {
      [styles["p--s"]]: size === "s",
      [styles["p--m"]]: size === "m",
      [styles["p--l"]]: size === "l",
    })}>{children}</p>
  )
}

export default P;