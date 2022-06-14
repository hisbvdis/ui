import clsx from "clsx";
import styles from "./Container.module.scss";

const Container = ({className, children}) => {
  return (<>
    <div className={clsx(styles["container"], className)}>
      {children}
    </div>
  </>)
}

export default Container;