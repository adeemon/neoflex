import { forwardRef, HTMLInputTypeAttribute, useState } from 'react';
import { InputFieldIcon } from '../ui-toolkit/inputFieldIcon/inputFieldIcon';


export interface InputProps {
  name: string;
  value: string | null | Date | number;
  label?: string | null;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  isInvalid?: boolean;
  isValidated?: boolean;
  errorMessage?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  name,
  value,
  label,
  placeholder,
  type,
  isInvalid,
  isValidated,
  errorMessage,
  className,
}, ref) => {
  const [valueInner, setValueInner] = useState(value);
  return (
    <div className="input__container" ref={ ref }>
      { label && <label className="input__label" htmlFor={ name }>{ label }</label> }
      <div className={ `input__field-container ${isInvalid ? 'invalid' : 'valid'}` }>
        <input
          className={ `${className || ''} input__field` }
          ref={ ref }
          id={ name }
          name={ name }
          aria-label={ name }
          placeholder={ placeholder }
          type={ type }
          value={ valueInner?.toString().replace(/ +/g, ' ') }
          onChange={ (e) =>
            setValueInner(e.target.value) }
        />
        <InputFieldIcon isInvalid={ isInvalid } isValidated={ isValidated } />
      </div>
      { errorMessage && (
        <div className="input__error-message" ref={ ref }>
          { errorMessage }
        </div>
      ) }
    </div>
  );
});

Input.defaultProps = {
  label: undefined,
  placeholder: undefined,
  type: 'text',
  isInvalid: false,
  isValidated: false,
  errorMessage: undefined,
  className: undefined,
};


Input.displayName = 'Input';
