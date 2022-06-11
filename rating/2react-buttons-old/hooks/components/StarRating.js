import React, { useState } from "react";
import Star from "./Star.js";

const StarRating = ({amount=5}) => {
  const [selectedStars, setSelectedStars] = useState(3);
  
  return (<>
    {[...Array(amount)].map((_, i) => (
      <Star
        key={i}
        selected={selectedStars > i}
        onSelect={() => setSelectedStars(i + 1)}
      />
    ))}
  </>)
}

export default StarRating;