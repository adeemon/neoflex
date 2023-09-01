import * as React from 'react';


export interface ILabelProps {
    title?: string;
    elementId: string;
    isRequired?: boolean;
    child?: React.ReactNode;
}

export const Label: React.FC<ILabelProps> = ({ title, elementId, isRequired, child }) => (
    <div className="label">
        <label className="label__field" htmlFor={elementId}>
            {title && <p className="label__title">{title}</p>}
            {child}
        </label>
        {isRequired && <p className="label__required-symbol">*</p>}
    </div>
);
