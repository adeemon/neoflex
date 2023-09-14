import { forwardRef } from 'react';
import * as React from 'react';


interface InputProps {
  name: string;
  label?: string | null;
  errorMessage?: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(({
  name,
  label,
  errorMessage,
  id,
  onChange,
}, ref) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="checkbox__wrapper" ref={ ref }>
      <input
        className={ `checkbox__check${checked ? '-checked' : ''}` }
        ref={ ref }
        name={ name }
        type="checkbox"
        checked={ checked }
        value={ checked ? 'yes' : 'no' }
        id={ id }
        onChange={ (e) => {
          setChecked(!checked);
          onChange(e);
        } }
      />
      <div className="checkbox__info">
        <p className="checkbox__title">
          { label }
        </p>
        { errorMessage && (
          <div className="checkbox__error-message input__error-message" ref={ ref }>
            { errorMessage }
          </div>
        ) }
      </div>
    </div>
  );
});

Checkbox.defaultProps = {
  label: undefined,
  errorMessage: undefined,
};


Checkbox.displayName = 'Input';
