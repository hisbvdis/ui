import clsx from "clsx";
import { useId, useState } from "react";
import styles from "./Rating.module.css";
import RatingOption from "./RatingOption";

const Rating = ({className, amount=5, isEditable=false}) => {
  // Количество опций, которые на данный момент подсвечиваются
  const [displayedOptions, setDisplayedOptions] = useState(0);
  // Количество опций, которые были выбраны
  const [selectedOptions, setSelectedOptions] = useState(0);
  const groupId = useId();
  
  return (
    <fieldset className={clsx(styles["rating"], className)}>
      <legend className={clsx(styles["rating__legend"])}>Rating legend</legend>
      <ul
        className={clsx(styles["rating__options"])}
        // Когда курсор уводится с рейтинга, восстанавливать звёзды из "backup"
        onMouseLeave={() => setDisplayedOptions(selectedOptions)}
      >
        {[...Array(amount)].map((_, i) => (
          <RatingOption
            key={i}
            number={i}
            groupId={groupId}
            selected={displayedOptions > i}
            // Когда меняется количество звёзд, сохранять количество и в "backup"
            onChange={() => {
              setSelectedOptions(displayedOptions);
              setDisplayedOptions(i + 1)
            }}
            // Когда курсор попадает на звёзду — задать количество выбранных звёзд
            onMouseEnter={() => setDisplayedOptions(i + 1)}
          />
        ))}
      </ul>
    </fieldset>
  );
}

export default Rating;