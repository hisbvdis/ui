import { useState } from "react";
import React from "react";
import "./OptionGroup.scss";

const OptionGroup = ({className="", children, name, heading}) => {
  const [state, setState] = useState(children[0].props.value);
  const childrenWithNewProps = React.Children.map(children, (child) => ({
    ...child,
    props: { ...child.props, name, state: [state, setState] },
  }));
  
  return (<>
    <fieldset className={`optionGroup ${className}`} aria-labelledby={`${name}-heading`}>
      <h3 className="optionGroup__heading" id={`${name}-heading`}>{heading}</h3>
      <ul className="optionGroup__list">
        {childrenWithNewProps.map((child, i) => (
          <li key={i} className="optionGroup__item">{child}</li>
        ))}
      </ul>
    </fieldset>
  </>)
}

export default OptionGroup;