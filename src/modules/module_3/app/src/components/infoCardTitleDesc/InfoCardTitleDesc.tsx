import * as React from 'react';
export interface IInfoCardTitleDescProps {
    isOdd: boolean,
    title: string,
    description: string,
    className?: string
}

export const InfoCardTitleDesc: React.FC<IInfoCardTitleDescProps> = ({isOdd, title, description, className}) => {
    return (
        <div className={`infoCardTitleDesc ${isOdd ? 'infoCardTitleDesc-gray' : 
        'infoCardTitleDesc-bone'} ${className? className : ''}`}>
            <p className="infoCardTitleDesc__description">
                {description}
            </p>
            <p className="infoCardTitleDesc__title">
                {title}
            </p>
        </div>
    )
}