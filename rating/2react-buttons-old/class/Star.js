import React from "react";
import PropTypes from "prop-types";

const Star = ({selected=false, clickHandler=f=>f}) => (
  <span 
    className={(selected) ? "star  star--selected" : "star"}
    onClick={clickHandler}>
  </span>
)

Star.propTypes = {
  selected: PropTypes.bool,
  clickHandler: PropTypes.func
}

export default Star;