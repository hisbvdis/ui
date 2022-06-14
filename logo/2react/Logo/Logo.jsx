import clsx from "clsx";
import styles from "./Logo.module.css";
import { ReactComponent as LogoImg } from "../../assets/img/logo.svg";

const Logo = ({className}) => {
  return (
    <div className={clsx(styles["logo"], className)}>
      <a className={styles["logo__link"]} href="#">
        <LogoImg className={styles["logo__img"]} width="106" height="24" alt="TestTask Logo"/>
      </a>
    </div>
  )
}

export default Logo;