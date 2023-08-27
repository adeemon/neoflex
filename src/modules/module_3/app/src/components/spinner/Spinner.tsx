import * as React from 'react';
import spinnerSvg from '../../assets/images/design/Spinner.svg'

export const Spinner: React.FC = () => {
    return (
        <img src={spinnerSvg}  className="rot" />
    )
}