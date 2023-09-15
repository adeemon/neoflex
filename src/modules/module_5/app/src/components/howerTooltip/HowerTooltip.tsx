import * as React from 'react';

interface IProps {
  children: JSX.Element;
  description: string;
}

export const HowerTooltip: React.FC<IProps> = ({ children, description }) => {
  const [isHover, setIsHover] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const tooltip = (
    <div className={`hower-tooltip__hover${isHover ? '-active' : ''}`}>
      {description}
    </div>
  );

  return (
    <div className="hower-tooltip__container">
      <div className="hower-tooltip__element"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        { children }
      </div>
      {isHover && tooltip}
    </div>
  );
};
