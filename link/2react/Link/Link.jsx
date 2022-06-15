import clsx from "clsx";
import styles from "./Link.module.scss";

const Link = ({className, children, href}) => {
  return (
    <a className={clsx(styles["link"], className)} href={href}>
      {children}
    </a>
  );
}

export default Link;