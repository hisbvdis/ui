import React from "react";
import "./Star.css";

const Star = ({selected=false, onSelect}) => (
  <button
    className={selected ? "star  star--selected" : "star"}
    onClick={onSelect}
  ></button>
)

export default Star;