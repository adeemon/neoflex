import { forwardRef } from 'react';
import * as React from 'react';

interface InputProps {
  name: string;
  label?: string | null;
  className?: string;
  defaultChecked?: boolean;
  onChange: (value: boolean) => void;
  errorMessage?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(({
  name,
  label,
  defaultChecked,
  className,
  onChange,
  errorMessage,
}, ref) => {
  const [checked, setChecked] = React.useState(defaultChecked);
  console.log(checked);
  return (
    <button
      type="button"
      className="checkbox__container"
      onClick={ () =>
        setChecked(!checked) }
    >
      <label className="checkbox__label" htmlFor={ name }>
        <input
          className={ `${className || ''} checkbox` }
          ref={ ref }
          name={ name }
          type="checkbox"
          checked={ checked }
          defaultChecked={ checked }
          onChange={ (e) => {
            setChecked(e.target.checked);
            onChange(e.target.checked);
          } }
        />
        { errorMessage && (
          <div className="input__error-message" ref={ ref }>
            { errorMessage }
          </div>
        ) }
        { checked ? 'X' : ' ' }
        { label }
      </label>
    </button>
  );
});

Checkbox.defaultProps = {
  label: undefined,
  className: undefined,
  errorMessage: 'Чекбокс пустой',
  defaultChecked: false,
};


Checkbox.displayName = 'Input';
