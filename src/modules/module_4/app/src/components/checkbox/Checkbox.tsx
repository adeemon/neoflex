import { forwardRef } from 'react';
import * as React from 'react';


interface InputProps {
  name: string;
  label?: string | null;
  errorMessage?: string;
  value?: boolean;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(({
  name,
  label,
  errorMessage,
  value,
  id,
  onChange,
}, ref) => {
  const [checked, setChecked] = React.useState(false);
  console.log(checked, value);
  return (
    <label className="checkbox__label" htmlFor={ name }>
      <button
        type="button"
        onClick={ () =>
          setChecked(!checked) }
        onKeyPress={ () =>
          setChecked(!checked) }
      >
        <input
          className={ `checkbox__check${checked ? '-checked' : ''}` }
          ref={ ref }
          name={ name }
          type="checkbox"
          checked={checked}
          value={checked ? 'yes' : 'no'}
          id={id}
          onChange={(e) =>
            onChange(e)}
        />
        { errorMessage && (
          <div className="input__error-message" ref={ ref }>
            { errorMessage }
          </div>
        ) }
      </button>
      {label}
    </label>
  );
});

Checkbox.defaultProps = {
  label: undefined,
  errorMessage: undefined,
  value: false,
};


Checkbox.displayName = 'Input';
