import { forwardRef, HTMLInputTypeAttribute } from 'react';
import { InputFieldIcon } from '../ui-toolkit/inputFieldIcon/inputFieldIcon';


interface InputProps {
  name: string;
  value: string | null | Date | number;
  label?: string | null;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  isInvalid?: boolean;
  isValidated?: boolean;
  errorMessage?: string;
  className?: string;
  onChange: (value: string) => void;
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
  onChange,
}, ref) => (
  <div className="input__container" ref={ ref }>
    { label && <label className="input__label" htmlFor={ name }>{ label }</label> }
    <div className={`input__field-container ${isInvalid ? 'invalid' : 'valid'}`}>
        <input
        className={`${className || ''} input__field`}
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