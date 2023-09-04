import * as React from 'react';
import { ReactComponent as CorrectIcon } from '../../../assets/images/design/Check_fill.svg';
import { ReactComponent as IncorrectIcon } from '../../../assets/images/design/Close_round_fill.svg';


export interface IInputFieldIconProps {
    isValidated?: boolean;
    isInvalid?: boolean;
}

export const InputFieldIcon: React.FC<IInputFieldIconProps> = ({ isValidated, isInvalid }) => (
    <>
        {isValidated ? (
            <div className={`input-icon ${isValidated ? 'visible' : 'hidden'}`}>
                {!isInvalid ? <CorrectIcon /> : <IncorrectIcon />}
            </div>
        )
        : ''}
    </>
);