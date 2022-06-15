import clsx from "clsx"
import styles from "./H.module.scss"

export const H1 = ({className, children, ...props}) => {
  return (
    <h1 className={clsx(styles["h1"], className)} {...props}>
      {children}
    </h1>
  );
}

export const H2 = ({className, children, ...props}) => {
  return (
    <h2 className={clsx(styles["h2"], className)} {...props}>
      {children}
    </h2>
  );
}

export const H3 = ({className, children, ...props}) => {
  return (
    <h3 className={clsx(styles["h3"], className)} {...props}>
      {children}
    </h3>
  );
}

export const H4 = ({className, children, ...props}) => {
  return (
    <h4 className={clsx(styles["h4"], className)} {...props}>
      {children}
    </h4>
  );
}

export const H5 = ({className, children, ...props}) => {
  return (
    <h5 className={clsx(styles["h5"], className)} {...props}>
      {children}
    </h5>
  );
}

export const H6 = ({className, children, ...props}) => {
  return (
    <h6 className={clsx(styles["h6"], className)} {...props}>
      {children}
    </h6>
  );
}