import { useState } from "react";
import Rating from "./Rating/Rating";

const App = () => {
  const [rating, setRating] = useState(-1);
  
  return (
    <Rating activeOption={rating} setRating={(value) => setRating(value)}/>
  )
}

export default App;