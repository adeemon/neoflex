import { forwardRef, HTMLInputTypeAttribute } from "react";

import { string } from "yup";
import { InputFieldIcon } from "../ui-toolkit/inputFieldIcon/inputFieldIcon";

interface InputProps {
  name: string,
  value: string | null | Date | number,
  label?: string,
  placeholder?: string,
  type?: HTMLInputTypeAttribute,
  isInvalid?: boolean,
  isValidated?: boolean,
  errorMessage?: string,
  onChange: (value: string) => void,
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  name,
  value,
  label,
  placeholder,
  type = "text",
  isInvalid,
  isValidated,
  errorMessage,
  onChange
}, ref) => (
  <div className='input__container'>
    { label && <label className='input__label' htmlFor={ name }>{ label }</label> }
    <div className={`input__field-container ${isInvalid ? 'invalid': 'valid'}`}>
        <input
        className={`input__field`}
        ref={ ref }
        id={ name }
        name={ name }
        placeholder={ placeholder }
        type={ type }
        value={ value?.toString().trim() }
        onChange={ (e) => onChange(e.target.value) }
        />
        <InputFieldIcon isInvalid={isInvalid} isValidated={isValidated} />
    </div>
    { errorMessage && (
      <div className="input__error-message">
        { errorMessage }
      </div>
    ) }
  </div>
));

Input.displayName = "Input";