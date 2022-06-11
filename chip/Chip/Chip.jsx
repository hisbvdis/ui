import styles from "./Chip.module.css";
import clsx from "clsx";

const Chip = ({className, children, fontSize="s", theme="ghost", href=""}) => {
  return (
    <a
      className={clsx(styles.chip, className, {
        [styles["chip--fontSize_s"]]: fontSize === "s",
        [styles["chip--fontSize_m"]]: fontSize === "m",
        [styles["chip--theme_ghost"]]: theme === "ghost",
        [styles["chip--theme_green"]]: theme === "green",
        [styles["chip--theme_primary"]]: theme === "primary",
        [styles["chip--theme_red"]]: theme === "red",
        [styles["chip--theme_gray"]]: theme === "gray",
      })}
      href={href ? href : undefined}
    >
      {children}
    </a>
  );
}

export default Chip;