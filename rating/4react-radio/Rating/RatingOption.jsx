import styles from "./Rating.module.css";
import clsx from "clsx";
import { ReactComponent as OptionIcon } from "./option-icon.svg";

const RatingOption = ({number, selected=false, groupId, onChange, onMouseEnter,onMouseLeave}) => {
  return (
    <li className={styles["rating__option"]}>
      <label
        className={styles["option"]}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <input
          className={clsx(styles["option__input"], styles["srOnly"])}
          type="radio"
          name={groupId}
          onChange={onChange}
        />
        <OptionIcon
          className={clsx(styles["option__icon"], {
            [styles["option__icon--selected"]]: selected === true,
          })}
        />
        <span className={clsx(styles["option__title"], styles["srOnly"])}>
          Level {number + 1}
        </span>
      </label>
    </li>
  );
}

export default RatingOption;