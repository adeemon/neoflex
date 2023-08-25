import * as React from 'react';
import { forwardRef} from "react";

export interface ISelectProps {
    values: Array<string>,
    errorMessage?: string,
    onChange: (value: string) => void
}

export const Select = forwardRef<HTMLInputElement, ISelectProps>(({
    values,
    errorMessage,
    onChange
}, ref) => (
    <div className="select">
        <div className='select__container'>
        <select className='select__field'
            onChange={(e) => onChange(e.target.value)}
        >
            {
                values.map((element, index) => {
                    return (
                        <option className='select__option' value={element} key={index}>{element}</option>
                    )
                })
            }
        </select>
        </div>
        {errorMessage && <p className="select__error-message"></p>}
    </div>
));

Select.displayName='Select';


