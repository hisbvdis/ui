import styles from "./Rating.module.css";
import clsx from "clsx";
import { ReactComponent as ItemIcon } from "./item-icon.svg";

const RatingItem = ({selected=false, onClick}) => {
  return (
    <li>
      <button
        className={clsx(styles["rating__item"], {
          [styles["rating__item--selected"]]: selected === true,
        })}
        onClick={onClick}
      >
        <ItemIcon />
      </button>
    </li>
  );
}

export default RatingItem;