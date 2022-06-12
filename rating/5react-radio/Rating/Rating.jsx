import { useId, useState } from "react";
import RatingOption from "./RatingOption";
import styles from "./Rating.module.css";

const Rating = ({
  title = "Mark",
  options = 5,
  isEditable = true,
  activeOption = -1,
}) => {
  const groupName = useId();
  // ID выбранного элемента
  const [selected, setSelected] = useState(activeOption);
  // ID элемента, ДО КОТОРОГО выделить элементы
  const [displayed, setDisplayed] = useState(selected);

  return (
    <fieldset
      className={styles["rating"]}
      aria-label={title}
      // Увели курсор — записать ID, до которого выделить элементы:
      // ..до ранее выбранного элемента "selected", а не "displayed"
      onMouseLeave={() => setDisplayed(selected)}
    >
      {[...Array(options)].map((_, i) => (
        <RatingOption
          key={i}
          groupName={groupName}
          index={i}
          checked={i === selected}
          selected={i <= displayed}
          // Выбрали элемент — сохранить его ID и выделить элементы до него
          onChange={() => {
            if (!isEditable) return;
            setSelected(i);
            setDisplayed(i);
          }}
          // Навели курсор — записать ID, до которого выделить элементы
          onMouseEnter={() => {
            if (!isEditable) return;
            setDisplayed(i);
          }}
        />
      ))}
    </fieldset>
  );
};

export default Rating;