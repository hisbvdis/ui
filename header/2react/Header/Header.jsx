import styles from "./Header.module.css";
import clsx from "clsx";

const Header = ({className}) => {
  return (<>
    <header className={clsx(styles["header"], className)}>
      
    </header>
  </>)
}

export default Header;