import * as React from 'react';


export interface IInfoCardIconProps {
  isOdd: boolean;
  title: string;
  description: string;
  IconComponent: React.FC;
  className?: string;
}

export const InfoCardIcon: React.FC<IInfoCardIconProps> = ({ isOdd, title, description, IconComponent }) =>
  (
    <div className={ `infoCardIcon ${isOdd ? 'infoCardIcon-gray' : 'infoCardIcon-bone'}` }>
      <div className="infoCardIcon__icon-container">
        <IconComponent />
      </div>
      <p className="infoCardIcon__title">
        { title }
      </p>
      <p className="infoCardIcon__description">
        { description }
      </p>
    </div>
  );
