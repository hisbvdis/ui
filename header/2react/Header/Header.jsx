import styles from "./Header.module.css";
import clsx from "clsx";
import Logo from "../../components/Logo/Logo";

const Header = ({className}) => {
  return (<>
    <header className={clsx(styles["header"], className)}>
      <Logo/>
    </header>
  </>)
}

export default Header;