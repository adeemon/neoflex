import { forwardRef, useState } from 'react';

export interface ISelectProps {
  values: string[];
  errorMessage?: string;
  isInvalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ values, errorMessage, isInvalid }, ref) => {
    const [selected, SetSelected] = useState(values[0]);
    return (
      <div className="select">
        <div className={ `select__container${isInvalid ? '-invalid' : ''}` }>
          <select
            className="select__field"
            ref={ref}
            defaultValue={selected}
            onChange={ (e) =>
              SetSelected(e.target.value) }
          >
            { /* <option disabled selected value="" aria-label="empty thing" /> */ }
            { values.map((element, index) =>
              (
                <option className="select__option" value={ element } key={ index }>
                  { element }
                </option>
              )) }
          </select>
        </div>
        { isInvalid && errorMessage && <p className="select__error-message">{ errorMessage }</p> }
      </div>
    );
  },
);

Select.displayName = 'Select';
