import clsx from "clsx";
import { useState } from "react";
import styles from "./Rating.module.css";
import RatingItem from "./RatingItem";

const Rating = ({className, amount=5}) => {
  const [selectedItems, setSelectedItems] = useState(0);
  
  return (
    <ul className={clsx(styles["rating"], className)}>
      {[...Array(amount)].map((_, i) => (
        <RatingItem
          key={i}
          selected={selectedItems > i}
          onClick={() => setSelectedItems(i + 1)}
        />
      ))}
    </ul>
  );
}

export default Rating;