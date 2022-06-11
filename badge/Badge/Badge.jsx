import styles from "./Badge.module.css";
import clsx from "clsx";

const Badge = ({className, children}) => {
  return (
    <span className={clsx(styles.badge, className)}>{children}</span>
  )
}

export default Badge;