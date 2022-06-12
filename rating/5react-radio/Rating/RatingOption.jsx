import { ReactComponent as OptionIcon } from "./option-icon.svg";
import styles from "./Rating.module.css";
import clsx from "clsx";

const RatingOption = ({
  groupName,
  index,
  checked,
  selected,
  onChange,
  onMouseEnter,
}) => {
  return (
    <label
      className={clsx(styles["option"], {
        [styles["option--selected"]]: selected,
      })}
      onMouseEnter={onMouseEnter}
    >
      <input
        className={clsx(styles["option__input"], styles["srOnly"])}
        type="radio"
        name={groupName}
        value={index + 1}
        aria-label={index + 1}
        checked={checked}
        onChange={onChange}
      />
      <OptionIcon className={styles["option__mark"]} width="25" height="25" />
    </label>
  );
};

export default RatingOption;
