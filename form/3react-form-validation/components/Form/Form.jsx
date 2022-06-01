import { useState } from "react";
import Field from "../Field/Field";

const Form = () => {
  const [controls, setControls] = useState([
    {
      name: "email",
      type: "email",
      id: "email",
      value: "",
      label: "Email",
      required: true,
      shouldValidate: true,
      isTouched: false,
      isValid: true,
      validations: {
        required: true,
        emailFormat: true,
      }
    },
    {
      name: "password",
      type: "password",
      id: "password",
      value: "",
      label: "Password",
      required: true,
      shouldValidate: true,
      isTouched: false,
      isValid: true,
      validations: {
        required: true,
        minLength: 6,
      }
    }
  ]);

  const validateControl = (value, validations) => {
    if (!validations) return true;

    let isValid = true;

    if (validations.required) {
      isValid = value.trim().length !== "";
    }

    if (validations.emailFormat) {
      isValid = value.match(/.*@.*\..*/);
    }

    if (validations.minLength) {
      isValid = value.trim().length >= validations.minLength;
    }

    return !!isValid;
  }

  const handleChange = (evt, name) => {
    const value = evt.target.value;

    setControls(
      controls.map((control) =>
        control.name === name
          ? {
              ...control,
              value,
              isTouched: true,
              isValid: validateControl(value, control.validations),
            }
          : control
      )
    );

    console.log( controls )
  }

  return (
    <form>
      {controls.map((control, i) => (
        <Field
          key={i}
          {...control}
          onChange={(evt) => handleChange(evt, control.name)}
        />
      ))}
    </form>
  );
}

export default Form;