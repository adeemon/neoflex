import * as React from 'react';


export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    label?: string;
    isDisabled?: boolean;
}

export const ButtonMain: React.FC<IButtonProps> = ({ className, children, label, isDisabled = false, ...props }) => (
    <button type="button"
    className={`${className} default-button`}
    onClick={props.onClick}
    disabled={isDisabled}
    >
        {label || ''}
        {children}
    </button>
);