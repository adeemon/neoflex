import { forwardRef } from 'react';

export interface ISelectProps {
  values: string[];
  errorMessage?: string;
  isInvalid?: boolean;
  onChange: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ values, errorMessage, isInvalid, onChange }, ref) =>
    (
      <div className="select">
        <div className={ `select__container${isInvalid ? '-invalid' : ''}` }>
          <select
            className="select__field"
            ref={ ref }
            onChange={ (e) =>
              onChange(e.target.value) }
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
        { errorMessage && <p className="select__error-message">{ errorMessage }</p> }
      </div>
    ),
);

Select.displayName = 'Select';
